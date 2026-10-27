"use client";

import React from "react";

interface HookRailProps {
  className?: string;
}

// Pegs centrate și grupate în raport cu scena
const PEG_POSITIONS = ["10%", "30%", "50%", "70%", "90%"];

export function HookRail({ className = "" }: HookRailProps) {
  return (
    <div
      className={`relative w-full h-8 pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Wall shadow beneath rail */}
      <div className="absolute top-4 left-0 right-0 h-6 bg-gradient-to-b from-carbon/95 to-transparent blur-sm" />

      {/* The slim matte metal bar */}
      <div className="relative w-full h-[10px] bg-[#131518] rounded-[2px] border-t border-white/[0.08] border-b border-black/80 shadow-[0_6px_20px_rgba(0,0,0,0.95)] flex items-center">
        {/* Hairline specular groove */}
        <div className="w-full h-[1px] bg-white/[0.07]" />

        {/* Wall mounting brackets la capete */}
        <div className="absolute -left-1 w-4 h-7 -top-2.5 bg-[#1C1F24] border border-concrete/30 shadow-lg rounded-sm" />
        <div className="absolute -right-1 w-4 h-7 -top-2.5 bg-[#1C1F24] border border-concrete/30 shadow-lg rounded-sm" />

        {/* Hanging pegs */}
        {PEG_POSITIONS.map((pos, idx) => (
          <div
            key={idx}
            className="absolute -top-2.5 flex flex-col items-center"
            style={{ left: pos, transform: "translateX(-50%)" }}
          >
            {/* Peg cap */}
            <div className="w-4 h-4 rounded-full bg-[#282D35] border border-concrete/40 shadow-md flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14161A]" />
            </div>
            {/* Peg shaft */}
            <div className="w-[6px] h-5 bg-[#1E2228] border-r border-concrete/20 rounded-b-sm shadow-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
