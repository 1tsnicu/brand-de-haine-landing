"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlusIcon, ArrowRightIcon } from "@/components/ui/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Rotații deterministe per card pentru estetica de „fotografii prinse pe perete”
const STABLE_ROTATIONS = [-1.4, 1.2, -0.8, 1.5, -1.2, 0.9, -1.0, 1.3];

export function DropGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const openQuickView = useCartStore((state) => state.openQuickView);
  const addItem = useCartStore((state) => state.addItem);

  // Stagger reveal cu ScrollTrigger
  useEffect(() => {
    if (reducedMotion || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".drop-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
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
      id="drop-01"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-carbon border-b border-concrete/15"
      aria-label="Drop 01 Collection: Last Train"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-concrete/20">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-bordo" />
              <p className="font-mono text-[13px] tracking-widest text-mist uppercase font-medium">
                FIRST CAPSULE // FALL-WINTER
              </p>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-fog uppercase tracking-tight">
              DROP 01 &ldquo;LAST TRAIN&rdquo;
            </h2>
          </div>

          <div className="flex items-center gap-6 font-mono text-[13px] text-mist">
            <div>
              <span className="text-fog font-bold">07</span> PIECES + PHOTOCARD
            </div>
            <span>•</span>
            <div>
              <span className="text-fog font-bold">SELVEDGE & NYLON</span>
            </div>
            <span>•</span>
            <div className="text-bordo-light font-bold">LIMITED RUN</div>
          </div>
        </div>

        {/* ══ 4x2 BALANCED GRID: 7 PRODUSE + 1 PROMO CARD POLAROID ══ */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 items-stretch"
        >
          {products.map((product, index) => {
            const rotDeg = reducedMotion ? 0 : STABLE_ROTATIONS[index % STABLE_ROTATIONS.length];

            return (
              <article
                key={product.id}
                style={{
                  transform: `rotate(${rotDeg}deg)`,
                  transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                className="drop-card group relative bg-[#131518] border border-fog/[0.12] p-4 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.85)] hover:!rotate-0 hover:-translate-y-2 hover:z-20 hover:border-fog/40 hover:shadow-[0_20px_48px_rgba(0,0,0,0.95)]"
              >
                {/* Bucată realistă de bandă adezivă (tape) pe marginea de sus */}
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-11 h-4 bg-fog/[0.12] backdrop-blur-xs border border-white/[0.08] shadow-xs z-30 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Print foto cu swap de imagine la hover */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect ${product.name}`}
                  onClick={() => openQuickView(product)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openQuickView(product);
                    }
                  }}
                  className="relative aspect-[4/5] w-full bg-[#0E1012] border border-white/[0.06] overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bordo"
                >
                  {/* Imagine 1: Vedere primară */}
                  <Image
                    src={product.images[0]}
                    alt={`${product.name} primary view`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />

                  {/* Imagine 2: Detaliu macro la hover */}
                  <Image
                    src={product.images[1]}
                    alt={`${product.name} macro detail`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Mono Code Badge */}
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <Badge variant="subtle" className="bg-carbon/95 backdrop-blur-sm text-[11px] font-semibold border-concrete/30">
                      {product.monoCode}
                    </Badge>
                  </div>

                  {/* Quick-view hover overlay */}
                  <div className="absolute inset-0 bg-carbon/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                    <span className="px-3.5 py-1.5 border border-fog/60 bg-carbon/95 font-mono text-[12px] tracking-wider uppercase text-fog font-medium shadow-lg">
                      INSPECT OBJECT
                    </span>
                  </div>
                </div>

                {/* Date produs & Acțiuni */}
                <div className="pt-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => openQuickView(product)}
                        className="font-display font-bold text-[17px] text-fog hover:text-bordo transition-colors cursor-pointer tracking-tight"
                      >
                        {product.name}
                      </h3>
                      <p className="font-mono text-[15px] font-bold text-fog">
                        {formatCurrency(product.price)}
                      </p>
                    </div>

                    {/* Tagline de 10-12 cuvinte în loc de descriere tăiată */}
                    <p className="font-body text-[13px] text-mist leading-relaxed line-clamp-2">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Mărimi ca pilule curate */}
                  <div className="space-y-1.5 pt-2 border-t border-concrete/15">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[11px] text-mist/80 mr-1 uppercase">SIZES:</span>
                      {product.sizes.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[11px] px-1.5 py-0.5 border border-concrete/25 bg-carbon/60 text-mist"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buton rafinat: outline subtil (nu mai banalizăm bordo prin 7 repetiții) */}
                  <div className="pt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-1.5 hover:border-bordo hover:bg-oxblood/40 hover:text-fog transition-all"
                      onClick={() => addItem(product, product.sizes[0])}
                    >
                      <PlusIcon size={12} />
                      <span>Add to Bag</span>
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      className="px-2.5 hover:border-fog/50"
                      onClick={() => openQuickView(product)}
                      aria-label={`Inspect ${product.name}`}
                    >
                      <ArrowRightIcon size={13} />
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}

          {/* ══ SLOTUL 8: PROMO CARD POLAROID (COMPLETEAZĂ PERFECT GRILA 4x2) ══ */}
          <article
            style={{
              transform: reducedMotion ? "none" : `rotate(${STABLE_ROTATIONS[7]}deg)`,
              transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease",
            }}
            className="drop-card group relative bg-[#161416] border border-bordo/35 p-4 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.85)] hover:!rotate-0 hover:-translate-y-2 hover:z-20 hover:border-bordo hover:shadow-[0_20px_48px_rgba(107,20,39,0.35)]"
          >
            {/* Bandă adezivă semi-transparentă */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-11 h-4 bg-fog/[0.12] backdrop-blur-xs border border-white/[0.08] shadow-xs z-30 pointer-events-none"
              aria-hidden="true"
            />

            {/* Fotografie / Graphic Photocard */}
            <Link
              href="#photocard"
              className="relative aspect-[4/5] w-full bg-gradient-to-b from-[#1C1619] to-carbon border border-bordo/30 overflow-hidden flex flex-col items-center justify-center text-center p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bordo"
            >
              <div className="absolute top-2.5 left-2.5 z-20">
                <Badge variant="bordo" className="text-[11px] font-bold">
                  INCLUDED GIFT
                </Badge>
              </div>

              <div className="w-24 h-32 relative border border-fog/30 bg-[#0B0C0E] shadow-2xl p-2 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-20 bg-[#16181C] border border-white/[0.06] flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-bordo animate-pulse" />
                </div>
                <div className="flex justify-between items-center font-mono text-[8px] text-mist/70 pt-1">
                  <span>QH-D01</span>
                  <span className="text-bordo-light font-bold">FLIP 3D</span>
                </div>
              </div>

              <p className="font-mono text-[12px] text-mist mt-4 uppercase tracking-wider">
                NOCTURNAL ARCHIVE
              </p>
            </Link>

            {/* Informații Promo */}
            <div className="pt-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-[17px] text-fog tracking-tight">
                    Drop 01 Photocard
                  </h3>
                  <p className="font-mono text-[14px] font-bold text-bordo-light">
                    FREE
                  </p>
                </div>
                <p className="font-body text-[13px] text-mist leading-relaxed">
                  Numbered silver gelatin card sealed in foil. Enclosed with every order over €80.
                </p>
              </div>

              <div className="pt-2 border-t border-concrete/15 font-mono text-[12px] text-mist flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-bordo shrink-0" />
                <span>Unlocks secret Drop 02 timer</span>
              </div>

              <div className="pt-2">
                <a href="#photocard" className="block w-full">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2 cursor-pointer text-[13px]"
                  >
                    <span>Inspect Photocard</span>
                    <ArrowRightIcon size={13} />
                  </Button>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
