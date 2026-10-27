"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { brandConfig } from "@/config/brand";

interface PhotocardObjectProps {
  className?: string;
  style?: React.CSSProperties;
}

export function PhotocardObject({ className = "", style }: PhotocardObjectProps) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 15, hours: 11, minutes: 22, seconds: 47 });

  // Live countdown to next drop
  useEffect(() => {
    const target = new Date(brandConfig.nextDropDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Fallback relative loop
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      style={style}
      className={`relative select-none perspective-1000 group ${className}`}
    >
      {/* Industrial Hanging Clip / Ring connecting to the hook peg */}
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-5 border-[1.5px] border-concrete/60 bg-[#1A1C1F] rounded-t-sm shadow-md z-30 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-carbon border border-white/20" />
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label="Numbered Drop 01 Photocard. Click or press Enter to flip card in 3D."
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        className={`relative w-[110px] sm:w-[130px] h-[165px] sm:h-[195px] transition-transform duration-500 ease-out preserve-3d cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bordo rounded-sm ${
          isFlipped ? "rotate-y-180" : ""
        } group-hover:-translate-y-2`}
      >
        {/* Soft cast shadow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/80 rounded-full blur-md opacity-70 group-hover:opacity-90 group-hover:blur-lg transition-all"
          aria-hidden="true"
        />

        {/* FRONT FACE (B&W Street Object Plate) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-asphalt border border-concrete/30 shadow-xl overflow-hidden rounded-sm flex flex-col justify-between p-2">
          <div className="relative w-full h-[76%] bg-carbon border border-concrete/20 overflow-hidden">
            <Image
              src="/assets/hero/photocard-front.png"
              alt="Drop 01 collectible photocard front"
              fill
              priority
              sizes="130px"
              className="object-cover"
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[8px] text-concrete tracking-widest pt-1 border-t border-concrete/15">
            <span className="text-fog">DROP 01</span>
            <span className="text-bordo font-bold">FLIP 3D</span>
          </div>
        </div>

        {/* BACK FACE (Next Drop countdown & barcode) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-asphalt border border-bordo/60 shadow-2xl overflow-hidden rounded-sm flex flex-col justify-between p-2.5">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[7px] font-mono text-concrete tracking-widest">
              <span>NEXT DROP</span>
              <span className="text-bordo">11.11</span>
            </div>
            <p className="font-display font-black text-xs text-fog tracking-tight">
              LAST TRAIN
            </p>
          </div>

          {/* Live Countdown Box */}
          <div className="bg-carbon/90 border border-concrete/20 p-1.5 space-y-1 text-center font-mono">
            <p className="text-[7px] text-concrete tracking-widest uppercase">
              REVEAL IN
            </p>
            <div className="grid grid-cols-4 gap-0.5 text-fog font-bold text-[9px] sm:text-[10px]">
              <div>
                <span>{pad(timeLeft.days)}</span>
                <span className="block text-[6px] text-concrete font-normal">D</span>
              </div>
              <div>
                <span>{pad(timeLeft.hours)}</span>
                <span className="block text-[6px] text-concrete font-normal">H</span>
              </div>
              <div>
                <span>{pad(timeLeft.minutes)}</span>
                <span className="block text-[6px] text-concrete font-normal">M</span>
              </div>
              <div>
                <span className="text-bordo-light">{pad(timeLeft.seconds)}</span>
                <span className="block text-[6px] text-concrete font-normal">S</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[7px] font-mono text-concrete/80 pt-1 border-t border-concrete/15">
            <span>NO. 042/100</span>
            <span className="text-fog">SEOUL / CHIȘINĂU</span>
          </div>
        </div>
      </div>

      {/* Hover pill indicator */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 border border-concrete/20 bg-carbon/90 font-mono text-[9px] tracking-wider text-concrete pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
        {isFlipped ? "CLICK TO REVERSE" : "CLICK TO FLIP"}
      </div>
    </div>
  );
}

