"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Badge } from "@/components/ui/Badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PhotocardSlide() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pocketRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    if (reducedMotion || !cardRef.current || !pocketRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll-driven animation of card sliding up out of pocket
      gsap.fromTo(
        cardRef.current,
        { y: 130, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pocketRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-carbon border-b border-concrete/15 overflow-hidden"
      aria-label="Collectible Photocard Feature"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
        {/* Left Column: Context & Editorial Copy */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="bordo">COLLECTIBLE ARTIFACT</Badge>
            <span className="font-mono text-xs text-concrete">LIMITED TO 100 EDITIONS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-fog uppercase tracking-tight leading-tight">
            CONCEALED IN EVERY POCKET.
          </h2>

          <p className="font-body text-sm sm:text-base text-concrete leading-relaxed">
            Every garment in Drop 01 features a discrete interior sleeve engineered specifically to house a numbered silver halide photocard.
          </p>

          <p className="font-body text-sm sm:text-base text-concrete leading-relaxed">
            Printed on heavy matte fiber-base paper in darkroom conditions, each card documents an unrepeated nocturnal moment from the Seoul and Chișinău archives.
          </p>

          {/* Specifications list */}
          <div className="pt-4 border-t border-concrete/20 grid grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <span className="text-concrete block text-[10px]">PAPER:</span>
              <span className="text-fog">350 GSM FIBER MATTE</span>
            </div>
            <div>
              <span className="text-concrete block text-[10px]">PROCESS:</span>
              <span className="text-fog">SILVER HALIDE B&W</span>
            </div>
            <div>
              <span className="text-concrete block text-[10px]">SERIALIZATION:</span>
              <span className="text-bordo-light font-bold">001 — 100 STAMPED</span>
            </div>
            <div>
              <span className="text-concrete block text-[10px]">SLEEVE FIT:</span>
              <span className="text-fog">HOOK HOODIE / JKT</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Stage of Card Sliding out of Pocket */}
        <div className="flex flex-col items-center justify-center">
          <div
            ref={pocketRef}
            className="relative w-[280px] sm:w-[320px] h-[400px] flex flex-col justify-end items-center select-none"
          >
            {/* The Animated Photocard */}
            <div
              ref={cardRef}
              onClick={() => setIsFlipped((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsFlipped((prev) => !prev);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Collectible photocard. Click or press Enter to flip front and back."
              className="relative z-10 w-[190px] sm:w-[210px] h-[280px] sm:h-[310px] -mb-16 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bordo rounded shadow-2xl perspective-1000 group"
            >
              <div
                className={`w-full h-full preserve-3d transition-transform duration-500 rounded ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-asphalt border border-concrete/30 p-2.5 rounded shadow-2xl flex flex-col justify-between">
                  <div className="relative w-full h-[78%] bg-carbon border border-concrete/20 overflow-hidden">
                    <Image
                      src="/assets/hero/photocard-front.png"
                      alt="Drop 01 silver halide photocard front"
                      fill
                      sizes="210px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[9px] text-concrete pt-1">
                    <span className="text-fog">DROP 01</span>
                    <span className="text-bordo">CLICK TO FLIP</span>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-asphalt border border-bordo/60 p-3 rounded shadow-2xl flex flex-col justify-between font-mono">
                  <div className="space-y-1">
                    <p className="text-[9px] text-bordo-light font-bold">VERIFIED CARD</p>
                    <p className="font-display font-black text-sm text-fog">QH-D01-PC07</p>
                  </div>
                  <div className="py-2 border-y border-concrete/20 text-[9px] text-concrete space-y-1">
                    <p>ARCHIVE: CHIȘINĂU PLATFORM</p>
                    <p>TIME: 02:47 EET</p>
                    <p>ISO 400 • F=28mm</p>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-fog">
                    <span>AUTHENTIC OBJECT</span>
                    <span className="text-bordo font-bold">NO. 042</span>
                  </div>
                </div>
              </div>
            </div>

            {/* The Realistic Hoodie Interior Pocket Lip */}
            <div className="relative z-20 w-full h-44 bg-[#141618] border-t-2 border-concrete/40 shadow-[0_-12px_24px_rgba(0,0,0,0.9)] flex flex-col justify-between p-4">
              {/* Twin-needle stitching lines */}
              <div className="w-full flex flex-col gap-1">
                <div className="w-full border-t border-dashed border-concrete/40" />
                <div className="w-full border-t border-dashed border-concrete/40" />
              </div>

              {/* Pocket woven label */}
              <div className="self-center flex items-center gap-2 px-3 py-1 bg-carbon border border-concrete/30 font-mono text-[9px] tracking-widest text-concrete uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-bordo" />
                <span>INTERIOR STASH SLEEVE</span>
              </div>

              {/* Bottom edge shadow */}
              <div className="w-full text-center font-mono text-[8px] text-concrete/50">
                PULL TO INSPECT PHOTOCARD
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

