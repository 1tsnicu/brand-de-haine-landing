"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { brandCopy } from "@/content/copy";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MacroPlate {
  plateNumber: string;
  code: string;
  title: string;
  subtitle: string;
  weight: string;
  surface: string;
  notes: string;
  image: string;
}

const MACRO_PLATES: MacroPlate[] = [
  {
    plateNumber: "PL.01",
    code: "MAT-DNM-145",
    title: "14.5oz Selvedge Denim",
    subtitle: "LOW TENSION WEAVE // IBARA PARTNER",
    weight: "14.5 OZ / SQ YD",
    surface: "Subtle warp slub, deep sulfur-black dye, pre-shrunk cold water rinse.",
    notes: "Woven on vintage shuttle looms at deliberate low tension to preserve the indigo core. Rigid hand that breaks in without losing sharp boxy shoulders.",
    image: "/assets/products/platform-jacket-2.webp",
  },
  {
    plateNumber: "PL.02",
    code: "MAT-FRC-480",
    title: "480 GSM Loopback Fleece",
    subtitle: "DIAGONAL REVERSE // PORTUGAL KNIT",
    weight: "480 GSM ORGANIC COTTON",
    surface: "Dense diagonal loop structure, zero synthetic blend, brushed face.",
    notes: "Sculptural heavyweight drape engineered to resist sagging over night-long wear. Features a concealed internal stash sleeve for the Drop 01 photocard.",
    image: "/assets/products/hook-hoodie-2.webp",
  },
  {
    plateNumber: "PL.03",
    code: "MAT-HDW-024",
    title: "Die-Cast Zinc & Nylon",
    subtitle: "MATTE ANODIZED // CUSTOM TOOLING",
    weight: "SOLID DIE-CAST ALLOY",
    surface: "Chemical matte black finish, laser-etched 02:47 coordinates.",
    notes: "Solid zinc-aluminum hardware with zero rattle tolerances. Paired with heavy dual YKK teeth and reinforced nylon straps for silent movement.",
    image: "/assets/products/pocket-set-2.webp",
  },
];

export function UpClose() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".macro-plate");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="up-close"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-asphalt border-b border-concrete/15"
      aria-label="Up close textile and construction details"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-concrete/20">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-bordo" />
              <p className="font-mono text-[13px] tracking-widest text-mist uppercase font-medium">
                {brandCopy.upClose.tag}
              </p>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-fog uppercase tracking-tight">
              {brandCopy.upClose.title}
            </h2>
          </div>

          <p className="font-mono text-[13px] text-mist max-w-sm leading-relaxed">
            {brandCopy.upClose.body}
          </p>
        </div>

        {/* 3 Macro Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {MACRO_PLATES.map((plate) => (
            <article
              key={plate.code}
              className="macro-plate group relative bg-[#121417] border border-concrete/20 p-5 sm:p-6 flex flex-col justify-between shadow-xl hover:border-fog/40 transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Large Macro Photo Container */}
                <div className="relative aspect-[4/3] w-full bg-[#0E1012] border border-white/[0.06] overflow-hidden">
                  <Image
                    src={plate.image}
                    alt={plate.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  />

                  {/* Top Left Plate Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-carbon/95 border border-concrete/30 font-mono text-[11px] font-bold text-fog shadow-md">
                    {plate.plateNumber}
                  </div>

                  {/* Top Right Code Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-carbon/95 border border-concrete/30 font-mono text-[11px] text-mist/90 shadow-md">
                    {plate.code}
                  </div>
                </div>

                {/* Plate Typography & Tactical Notes */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] text-bordo-light font-bold tracking-widest uppercase">
                      {plate.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-fog tracking-tight">
                      {plate.title}
                    </h3>
                  </div>

                  <p className="font-body text-[14px] text-mist leading-relaxed">
                    {plate.notes}
                  </p>
                </div>
              </div>

              {/* Technical Spec Matrix Footnote */}
              <div className="pt-4 mt-6 border-t border-concrete/15 space-y-2 font-mono text-[12px]">
                <div className="flex justify-between items-center text-mist">
                  <span className="text-[11px] uppercase tracking-wide">SPEC WEIGHT:</span>
                  <span className="text-fog font-medium">{plate.weight}</span>
                </div>
                <div className="text-[11px] text-mist/80 leading-normal pt-1">
                  <span className="text-fog font-medium">SURFACE // </span>
                  <span>{plate.surface}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

