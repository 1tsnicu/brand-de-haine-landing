"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { brandConfig } from "@/config/brand";
import { brandCopy } from "@/content/copy";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Split reveal animation using ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        }
      ).fromTo(
        line2Ref.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.7"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-carbon border-b border-concrete/15 overflow-hidden"
      aria-label="Brand Manifesto"
    >
      {/* Background ambient radial highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(46,10,18,0.3)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center space-y-8">
        {/* Monospaced Section Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-concrete/25 bg-asphalt/80 text-[12px] font-mono tracking-widest text-mist uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-bordo" />
          <span>{brandCopy.manifesto.tag}</span>
        </div>

        {/* Two Monumental Lines */}
        <div ref={textContainerRef} className="space-y-4 max-w-5xl">
          <h2
            ref={line1Ref}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-fog tracking-tight uppercase leading-[1.15]"
          >
            {brandCopy.manifesto.line1}
          </h2>

          <h2
            ref={line2Ref}
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-fog/90 tracking-tight uppercase leading-[1.15] bg-gradient-to-r from-fog via-fog to-mist bg-clip-text text-transparent"
          >
            {brandCopy.manifesto.line2}
          </h2>
        </div>

        {/* Subtitle statement */}
        <p className="max-w-xl text-mist font-body text-base sm:text-lg leading-relaxed pt-2">
          {brandCopy.manifesto.body}
        </p>

        {/* Technical Coordinate Hairline */}
        <div className="pt-6 flex items-center gap-4 font-mono text-[12px] tracking-widest text-mist/80 uppercase">
          <span>{brandCopy.manifesto.coordinates}</span>
        </div>
      </div>
    </section>
  );
}

