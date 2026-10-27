"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lookbookItems } from "@/data/lookbook";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { brandCopy } from "@/content/copy";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LookbookGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".lookbook-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-carbon border-b border-concrete/15"
      aria-label="Nocturnal Lookbook"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-concrete/20">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-bordo" />
              <p className="font-mono text-[13px] tracking-widest text-mist uppercase font-medium">
                {brandCopy.lookbook.tag}
              </p>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-fog uppercase tracking-tight">
              {brandCopy.lookbook.title}
            </h2>
          </div>

          <p className="font-mono text-[13px] text-mist max-w-sm leading-relaxed">
            {brandCopy.lookbook.body}
          </p>
        </div>

        {/* Asymmetric Collage Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[290px] sm:auto-rows-[350px]"
        >
          {lookbookItems.map((item, idx) => (
            <div
              key={item.id}
              className={`lookbook-item group relative bg-[#121417] border border-white/[0.08] overflow-hidden ${item.span} shadow-xl hover:border-fog/40 transition-colors`}
            >
              {/* Background Object Photography with Slow Scale */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                />
              </div>

              {/* Film grain subtle overlay per tile */}
              <div
                className="absolute inset-0 bg-repeat opacity-[0.05] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: "url('/assets/hero/wall-bg.webp')" }}
                aria-hidden="true"
              />

              {/* Gradient Vignette overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/98 via-carbon/40 to-transparent pointer-events-none" />

              {/* Top mono timestamp badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-carbon/95 border border-concrete/30 backdrop-blur-xs font-mono text-[12px] tracking-wider text-fog font-medium shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-bordo" />
                <span>{item.timestamp}</span>
              </div>

              {/* Bottom clean mono captions */}
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1.5">
                <div className="flex items-center justify-between text-fog">
                  <h3 className="font-display font-bold text-base sm:text-lg tracking-tight uppercase">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[12px] text-bordo-light font-bold">
                    PL.{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-mist">
                  <span>{item.location}</span>
                  <span>•</span>
                  <span className="text-fog font-medium">{item.focalObject}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
