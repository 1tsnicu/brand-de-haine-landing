"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MaterialSpec {
  code: string;
  title: string;
  category: string;
  weight: string;
  origin: string;
  description: string;
  specs: string[];
  image: string;
}

const MATERIAL_SPECS: MaterialSpec[] = [
  {
    code: "MAT-01-DNM",
    title: "Selvedge-Grade Washed Denim",
    category: "TEXTILE ARCHITECTURE",
    weight: "14.5 OZ / SQ YD",
    origin: "IBARA, JAPAN MILL PARTNER",
    description: "Woven on vintage shuttle looms at deliberate low tension to produce subtle surface slub and nocturnal depth. Washed without harsh enzymes to preserve indigo core structure.",
    specs: ["Pure sulfur black & deep indigo yarn dye", "Pre-shrunk cold water wash", "Reinforced chainstitched hem", "Silver rivet coordinates"],
    image: "/assets/products/platform-jacket-2.webp",
  },
  {
    code: "MAT-02-TRY",
    title: "Diagonal Loopback French Terry",
    category: "HEAVY FLEECE",
    weight: "480 GSM",
    origin: "PORTUGAL SPECIALTY KNITTER",
    description: "Ultra-heavyweight 100% organic cotton loopback constructed with zero synthetic blends. Holds a sculptural boxy drape without sagging over prolonged nighttime wear.",
    specs: ["High-density diagonal loop reverse", "Double-needle coverstitching", "Concealed photocard sleeve", "Thermal regulation ribs"],
    image: "/assets/products/hook-hoodie-2.webp",
  },
  {
    code: "MAT-03-NYL",
    title: "3-Layer Matte Technical Nylon",
    category: "WEATHERPROOF SHELL",
    weight: "190 GSM",
    origin: "DAEGU, SOUTH KOREA",
    description: "Crisp micro-ripstop weave bonded to an ultra-thin hydrophilic membrane. 100% seam taped with thermal polyurethane tape for zero water penetration in cold rain.",
    specs: ["10,000mm hydrostatic head rating", "Matte non-reflective finish", "Thermal seam-sealed interior", "Silent friction-free movement"],
    image: "/assets/products/night-shell-parka-2.webp",
  },
  {
    code: "MAT-04-HDW",
    title: "Solid Zinc Hardware & Reversible Pulls",
    category: "CUSTOM HARDWARE",
    weight: "CUSTOM DIE-CAST",
    origin: "GUNMA INDUSTRIAL WORKSHOP",
    description: "Industrial hardware die-cast from dense zinc-aluminum alloy with matte black anodized coating. Stamped with microscopic '02:47' timestamps and debossed QH monograms.",
    specs: ["Matte black chemical anodization", "Laser-engraved coordinates", "Heavy duty dual YKK teeth", "Zero rattle tolerances"],
    image: "/assets/products/pocket-set-2.webp",
  },
];

export function Materials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".mat-card");
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
              start: "top 75%",
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
      id="materials"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-asphalt border-b border-concrete/15"
      aria-label="Materials and Construction"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-concrete/20">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-bordo" />
              <p className="font-mono text-[13px] tracking-widest text-mist uppercase font-medium">
                CONSTRUCTION & TEXTILES
              </p>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-fog uppercase tracking-tight">
              MATERIALS ARCHITECTURE
            </h2>
          </div>

          <p className="font-mono text-[13px] text-mist max-w-sm leading-relaxed">
            Spotless execution, raw materials. Engineered to age through night commutes without distortion.
          </p>
        </div>

        {/* 4 Materials Detailed Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {MATERIAL_SPECS.map((mat) => (
            <div
              key={mat.code}
              className="mat-card group relative bg-carbon border border-concrete/20 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-xl hover:border-fog/40 transition-colors"
            >
              {/* Macro Preview Thumbnail */}
              <div className="relative w-full sm:w-48 aspect-square shrink-0 bg-asphalt border border-concrete/20 overflow-hidden">
                <Image
                  src={mat.image}
                  alt={mat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-carbon/95 font-mono text-[11px] text-fog font-medium border border-concrete/30">
                  {mat.code}
                </div>
              </div>

              {/* Textual Specs */}
              <div className="flex-1 space-y-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-[12px] text-bordo-light font-bold tracking-wider uppercase">
                    {mat.category}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-fog tracking-tight">
                    {mat.title}
                  </h3>
                </div>

                <p className="font-body text-[14px] text-mist leading-relaxed">
                  {mat.description}
                </p>

                {/* Technical Metric Pills */}
                <div className="pt-3 border-t border-concrete/20 grid grid-cols-2 gap-3 font-mono text-[12px]">
                  <div>
                    <span className="text-mist block text-[11px] uppercase tracking-wide">WEIGHT:</span>
                    <span className="text-fog font-medium">{mat.weight}</span>
                  </div>
                  <div>
                    <span className="text-mist block text-[11px] uppercase tracking-wide">PROVENANCE:</span>
                    <span className="text-fog font-medium">{mat.origin}</span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-1.5 pt-1 font-mono text-[12px] text-mist">
                  {mat.specs.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-bordo-light font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

