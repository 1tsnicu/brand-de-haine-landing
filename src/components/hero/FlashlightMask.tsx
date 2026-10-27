"use client";

import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FlashlightMaskProps {
  ambientLightOn: boolean;
  isFlashing: boolean;
}

export function FlashlightMask({ ambientLightOn, isFlashing }: FlashlightMaskProps) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* 1. Camera Flash Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-white pointer-events-none transition-opacity duration-150 ${
          isFlashing && !reducedMotion ? "opacity-90" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* 2. Ambient Glow Mesh — Oxblood + Bordo behind the rail, only in ON state */}
      <div
        className={`absolute inset-0 pointer-events-none z-[1] transition-opacity duration-[600ms] ease-out ${
          ambientLightOn ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* Primary: deep oxblood/bordo core chiar în spatele cuierului și hainelor */}
        <div
          className="absolute"
          style={{
            top: "38%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1100px",
            height: "600px",
            background:
              "radial-gradient(ellipse at center, rgba(107,20,39,0.55) 0%, rgba(46,10,18,0.7) 40%, transparent 72%)",
            filter: "blur(50px)",
          }}
        />
        {/* Secondary: wide soft spread */}
        <div
          className="absolute"
          style={{
            top: "42%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1600px",
            height: "800px",
            background:
              "radial-gradient(ellipse at center, rgba(107,20,39,0.18) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* 3. Dark-room Flashlight Shroud — radial mask that follows cursor */}
      {!reducedMotion && (
        <div
          className={`absolute inset-0 pointer-events-none z-[18] transition-opacity duration-[600ms] ease-out ${
            ambientLightOn ? "opacity-[0.12]" : "opacity-[0.97]"
          }`}
          style={{
            background: `radial-gradient(
              circle var(--flashlight-radius, 340px) at var(--flashlight-x, 50%) var(--flashlight-y, 50%),
              transparent 0%,
              rgba(11,12,14,0.35) 60%,
              rgba(11,12,14,0.98) 100%
            )`,
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
