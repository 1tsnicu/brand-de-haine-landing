"use client";

import React from "react";
import { brandConfig } from "@/config/brand";

interface HeroWordmarkProps {
  parallaxOffset?: { x: number; y: number };
  ambientLightOn?: boolean;
  className?: string;
}

export function HeroWordmark({
  parallaxOffset = { x: 0, y: 0 },
  ambientLightOn = false,
  className = "",
}: HeroWordmarkProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none z-10 flex justify-center ${className}`}
      aria-hidden="true"
    >
      <div
        style={{
          transform: `translate3d(${parallaxOffset.x * 0.4}px, ${
            28 + parallaxOffset.y * 0.3
          }%, 0)`,
          transition: "transform 0.15s ease-out",
        }}
        className="w-full text-center"
      >
        <span
          className={`font-display font-black text-[15.5vw] leading-[0.72] tracking-tighter uppercase whitespace-nowrap block transition-opacity duration-700 ${
            ambientLightOn ? "opacity-[0.22]" : "opacity-[0.10]"
          } text-fog drop-shadow-[0_-10px_20px_rgba(0,0,0,0.4)]`}
        >
          {brandConfig.name}
        </span>
      </div>
    </div>
  );
}
