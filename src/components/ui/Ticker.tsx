"use client";

import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { brandConfig } from "@/config/brand";

interface TickerProps {
  text?: string;
  className?: string;
}

export function Ticker({ text = brandConfig.tickerText, className = "" }: TickerProps) {
  const reducedMotion = useReducedMotion();

  // Repeat text to fill scrolling loop
  const items = Array(6).fill(text);

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-concrete/15 bg-carbon/90 py-2.5 select-none ${className}`}
      aria-label="Announcements"
    >
      <div
        className={`flex w-max items-center gap-12 font-mono text-[12px] tracking-[0.18em] uppercase text-mist font-medium ${
          reducedMotion ? "" : "animate-[marquee_35s_linear_infinite]"
        }`}
      >
        {items.map((str, idx) => (
          <span key={idx} className="flex items-center gap-12 whitespace-nowrap">
            <span>{str}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-bordo/80" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

