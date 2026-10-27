"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface EarbudsCableProps {
  isVisible?: boolean;
  className?: string;
  mousePosRef: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
}

interface PhysicsNode {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned: boolean;
}

const NUM_SEGMENTS = 14;
const SEGMENT_LENGTH = 18;
const GRAVITY = 0.45;
const FRICTION = 0.94;
const MOUSE_INFLUENCE_RADIUS = 160;
const MOUSE_PULL_STRENGTH = 0.08;

export function EarbudsCable({
  isVisible = true,
  className = "",
  mousePosRef,
}: EarbudsCableProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const animFrameId = useRef<number | null>(null);

  // Initial nodes setup
  const nodesRef = useRef<PhysicsNode[]>([]);

  const initNodes = useCallback(() => {
    const nodes: PhysicsNode[] = [];
    const startX = 60;
    const startY = 160; // where the cable exits the earbuds hanging on hook
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const x = startX + Math.sin(i * 0.4) * 12;
      const y = startY + i * SEGMENT_LENGTH;
      nodes.push({
        x,
        y,
        oldX: x,
        oldY: y,
        pinned: i === 0, // top node pinned to earbud body
      });
    }
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    initNodes();
  }, [initNodes]);

  useEffect(() => {
    if (reducedMotion || !isVisible) {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
      return;
    }

    const updatePhysics = () => {
      const nodes = nodesRef.current;
      if (!nodes || nodes.length === 0 || !containerRef.current) {
        animFrameId.current = requestAnimationFrame(updatePhysics);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const mouse = mousePosRef.current;

      // Mouse pos relative to SVG container
      const localMouseX = mouse.x - rect.left;
      const localMouseY = mouse.y - rect.top;

      // 1. Verlet Integration & Mouse Influence
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.pinned) continue;

        const vx = (node.x - node.oldX) * FRICTION;
        const vy = (node.y - node.oldY) * FRICTION + GRAVITY;

        node.oldX = node.x;
        node.oldY = node.y;

        node.x += vx;
        node.y += vy;

        // Influence of cursor proximity
        if (mouse.active) {
          const dx = localMouseX - node.x;
          const dy = localMouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_INFLUENCE_RADIUS && dist > 1) {
            const force = (1 - dist / MOUSE_INFLUENCE_RADIUS) * MOUSE_PULL_STRENGTH;
            node.x += dx * force;
            node.y += dy * force;
          }
        }
      }

      // 2. Distance Constraints (Relaxation)
      for (let iteration = 0; iteration < 4; iteration++) {
        for (let i = 0; i < nodes.length - 1; i++) {
          const n1 = nodes[i];
          const n2 = nodes[i + 1];

          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const diff = (dist - SEGMENT_LENGTH) / dist;

          if (!n1.pinned && !n2.pinned) {
            n1.x += dx * 0.5 * diff;
            n1.y += dy * 0.5 * diff;
            n2.x -= dx * 0.5 * diff;
            n2.y -= dy * 0.5 * diff;
          } else if (n1.pinned && !n2.pinned) {
            n2.x -= dx * diff;
            n2.y -= dy * diff;
          } else if (!n1.pinned && n2.pinned) {
            n1.x += dx * diff;
            n1.y += dy * diff;
          }
        }
      }

      // 3. Generate smooth SVG path
      if (pathRef.current && nodes.length > 2) {
        let pathData = `M ${nodes[0].x.toFixed(1)} ${nodes[0].y.toFixed(1)}`;
        for (let i = 1; i < nodes.length - 1; i++) {
          const xc = ((nodes[i].x + nodes[i + 1].x) / 2).toFixed(1);
          const yc = ((nodes[i].y + nodes[i + 1].y) / 2).toFixed(1);
          pathData += ` Q ${nodes[i].x.toFixed(1)} ${nodes[i].y.toFixed(1)}, ${xc} ${yc}`;
        }
        const last = nodes[nodes.length - 1];
        pathData += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
        pathRef.current.setAttribute("d", pathData);
      }

      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };
  }, [isVisible, reducedMotion, mousePosRef]);

  return (
    <div
      ref={containerRef}
      className={`relative w-[130px] h-[480px] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Wall shadow behind earbuds body */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-32 bg-black/80 blur-xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Earbuds head sitting on hook */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-44 z-20">
        <Image
          src="/assets/hero/earbuds.png"
          alt="White wired earbuds"
          fill
          priority
          sizes="112px"
          className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* Trailing Physics Cable SVG */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible z-10"
        viewBox="0 0 130 480"
      >
        <path
          ref={pathRef}
          d="M 60 160 Q 65 240, 58 320 T 62 420"
          fill="none"
          stroke="#E5E3DE"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] opacity-90 transition-opacity"
        />
        {/* Subtle 3.5mm jack terminal at cable end */}
        <circle
          cx={nodesRef.current[NUM_SEGMENTS - 1]?.x || 62}
          cy={nodesRef.current[NUM_SEGMENTS - 1]?.y || 420}
          r="3"
          fill="#A0A0A0"
        />
      </svg>
    </div>
  );
}

