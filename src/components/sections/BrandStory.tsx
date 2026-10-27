"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BrandStory() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-carbon border-b border-concrete/15 overflow-hidden"
      aria-label="Brand philosophy and nocturnal context"
    >
      {/* Background soft ambient oxblood highlight */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(46,10,18,0.25)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Atmospheric Plate (Denim on hook, no models) */}
        <div className="md:col-span-5 relative aspect-[4/5] bg-asphalt border border-concrete/20 overflow-hidden shadow-2xl">
          <Image
            src="/assets/lookbook/01.webp"
            alt="Denim jacket resting on a platform hook at midnight"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover filter brightness-[0.88] hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-carbon/95 border border-concrete/25 font-mono text-[11px] text-mist tracking-widest uppercase">
            PLATE 02:14 // OBJECT STUDY
          </div>
        </div>

        {/* 3-line statement */}
        <div ref={textRef} className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-concrete/25 bg-asphalt/80 text-[11px] font-mono tracking-widest text-mist uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-bordo" />
            <span>NOCTURNAL PHILOSOPHY</span>
          </div>

          <blockquote className="space-y-4">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-fog tracking-tight uppercase leading-[1.2]">
              We don&rsquo;t design for daylight.
            </h3>
            <p className="font-display font-medium text-lg sm:text-xl text-fog/90 leading-snug">
              The collection is engineered for empty train platforms, cold transit tunnels, and the hours between midnight and dawn.
            </p>
            <p className="font-body text-[14px] text-mist leading-relaxed pt-2 max-w-xl">
              Clean and spotless garments tailored from heavy raw selvedge, dense diagonal fleece, and silence-tested hardware. Nothing damaged, nothing distressed — only calm architecture for dark transit.
            </p>
          </blockquote>

          <div className="pt-4 flex items-center gap-4 font-mono text-[11px] text-mist/75 uppercase tracking-widest">
            <span>SEOUL — CHIȘINĂU ARCHIVE</span>
            <span>•</span>
            <span className="text-bordo-light font-semibold">03:15 KST</span>
          </div>
        </div>
      </div>
    </section>
  );
}

