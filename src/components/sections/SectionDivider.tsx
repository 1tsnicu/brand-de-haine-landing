"use client";

import React from "react";

interface SectionDividerProps {
  label?: string;
  className?: string;
}

export function SectionDivider({ label, className = "" }: SectionDividerProps) {
  return (
    <div
      className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-concrete/20 to-transparent" />
      {label && (
        <span className="absolute px-3 bg-carbon font-mono text-[11px] tracking-widest uppercase text-mist/60 border border-concrete/20 rounded-xs">
          {label}
        </span>
      )}
    </div>
  );
}

