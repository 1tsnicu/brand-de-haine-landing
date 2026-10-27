"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCartStore } from "@/store/useCartStore";
import { products } from "@/data/products";
import { SpeakerOnIcon, SpeakerOffIcon } from "@/components/ui/Icons";

interface CameraObjectProps {
  onTriggerFlash: () => void;
  playShutterSound: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CameraObject({
  onTriggerFlash,
  playShutterSound,
  isMuted,
  onToggleMute,
  className = "",
  style,
}: CameraObjectProps) {
  const reducedMotion = useReducedMotion();
  const openQuickView = useCartStore((state) => state.openQuickView);
  const [isHovered, setIsHovered] = useState(false);

  // Related product to open (Pocket Set)
  const relatedProduct = products.find((p) => p.slug === "pocket-set") || products[0];

  const handleClick = () => {
    onTriggerFlash();
    playShutterSound();
    // Open quick-view modal
    setTimeout(() => {
      openQuickView(relatedProduct);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      style={style}
      className={`relative group select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Trigger Container */}
      <button
        type="button"
        aria-label="Compact Digital Camera. Press to capture flash photo and inspect Pocket Set accessories."
        onClick={handleClick}
        className={`relative w-[150px] sm:w-[170px] h-[250px] sm:h-[280px] p-0 bg-transparent border-0 text-left cursor-pointer transition-transform duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bordo ${
          isHovered ? "-translate-y-2.5 scale-[1.02]" : "translate-y-0"
        }`}
      >
        {/* Realistic wall contact shadow behind camera body */}
        <div
          className={`absolute inset-x-4 bottom-4 top-24 bg-black/85 blur-xl pointer-events-none rounded-2xl transition-all duration-300 ${
            isHovered ? "opacity-100 scale-105 translate-y-3" : "opacity-60 scale-95 translate-y-1"
          }`}
          aria-hidden="true"
        />

        {/* Soft shadow that expands on hover */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/80 rounded-full blur-md transition-all duration-300 ${
            isHovered ? "opacity-90 scale-110 blur-lg" : "opacity-50 scale-95"
          }`}
          aria-hidden="true"
        />

        {/* Camera Graphic */}
        <div className="relative w-full h-full">
          <Image
            src="/assets/hero/camera.png"
            alt="Silver compact digital camera with braided olive strap"
            fill
            priority
            sizes="170px"
            className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
          />

          {/* Slow-blinking Bordo Status LED */}
          <div
            className={`absolute top-[68%] right-[32%] w-2 h-2 rounded-full bg-bordo shadow-[0_0_8px_#6B1427] ${
              reducedMotion ? "opacity-80" : "animate-pulse duration-1000"
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Hover / Focus Mono Badge */}
        <div
          className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 border border-concrete/30 bg-carbon/95 backdrop-blur-sm font-mono text-[10px] tracking-widest uppercase text-fog pointer-events-none transition-all duration-200 z-30 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 sm:opacity-0 sm:group-focus-visible:opacity-100"
          }`}
        >
          <span className="text-bordo mr-1.5">•</span>
          <span>CCD-8.0 • CLICK TO FLASH</span>
        </div>
      </button>

      {/* Discrete Audio Shutter Mute Toggle Button — ancorat chiar pe marginea carcasei camerei */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleMute();
        }}
        className="absolute bottom-16 -right-1 z-30 p-1.5 rounded-full border border-concrete/40 bg-carbon/95 text-concrete hover:text-fog hover:border-fog/50 transition-colors focus-visible:outline-bordo cursor-pointer shadow-md"
        aria-label={isMuted ? "Unmute mechanical shutter sound" : "Mute shutter sound"}
        title={isMuted ? "Unmute Shutter Sound" : "Mute Shutter Sound"}
      >
        {isMuted ? <SpeakerOffIcon size={12} /> : <SpeakerOnIcon size={12} className="text-bordo-light" />}
      </button>
    </div>
  );
}

