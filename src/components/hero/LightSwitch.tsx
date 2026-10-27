"use client";

import React, { useState } from "react";

interface LightSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function LightSwitch({
  isOn,
  onToggle,
  className = "",
  style,
}: LightSwitchProps) {
  const [isPulling, setIsPulling] = useState<boolean>(false);

  const handlePull = () => {
    setIsPulling(true);
    onToggle();
    setTimeout(() => {
      setIsPulling(false);
    }, 250);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePull();
    }
  };

  return (
    <div
      style={style}
      className={`relative select-none flex flex-col items-center group cursor-pointer ${className}`}
    >
      <div
        role="switch"
        tabIndex={0}
        aria-checked={isOn}
        aria-label={`Ambient room lighting switch. Currently ${isOn ? "ON" : "OFF"}. Press Enter or Space to toggle.`}
        onClick={handlePull}
        onKeyDown={handleKeyDown}
        className="flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bordo rounded p-1"
      >
        {/* Ceiling mount socket */}
        <div className="w-5 h-2 bg-[#282C32] border border-concrete/40 rounded-t-sm" />

        {/* Beaded ball chain */}
        <div
          className={`flex flex-col items-center transition-transform duration-200 ease-out ${
            isPulling ? "translate-y-2.5" : "translate-y-0"
          }`}
        >
          {/* 12 small beads */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full my-[1.5px] border border-black/40 shadow-xs transition-colors ${
                isOn ? "bg-[#C4A96D]" : "bg-[#6A7079]"
              }`}
            />
          ))}

          {/* Metal Bell Fob / Pull Weight */}
          <div
            className={`w-3.5 h-7 rounded-b-md border border-concrete/50 shadow-md flex items-center justify-center transition-colors ${
              isOn
                ? "bg-gradient-to-b from-[#A4884B] to-[#5C4B25]"
                : "bg-gradient-to-b from-[#3E434B] to-[#1C1F24]"
            }`}
          >
            {/* Tiny indicator light on the pull fob */}
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isOn ? "bg-bordo shadow-[0_0_6px_#A02A3E]" : "bg-black/60"
              }`}
            />
          </div>
        </div>

        {/* Hover label */}
        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 border border-concrete/25 bg-carbon/95 backdrop-blur-sm font-mono text-[9px] tracking-widest uppercase text-concrete opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none z-30">
          <span>LIGHT: </span>
          <span className={isOn ? "text-bordo-light font-bold" : "text-fog"}>
            {isOn ? "ROOM LIT" : "FLASHLIGHT"}
          </span>
        </div>
      </div>
    </div>
  );
}

