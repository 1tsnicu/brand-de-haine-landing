"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { brandConfig } from "@/config/brand";
import { products } from "@/data/products";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { HookRail } from "./HookRail";
import { FlashlightMask } from "./FlashlightMask";
import { EarbudsCable } from "./EarbudsCable";
import { CameraObject } from "./CameraObject";
import { PhotocardObject } from "./PhotocardObject";
import { GarmentObject } from "./GarmentObject";
import { LightSwitch } from "./LightSwitch";
import { HeroWordmark } from "./HeroWordmark";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function HeroScene() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { isMuted, toggleMute, playShutterSound, playSwitchSound } =
    useSoundEffect();

  const [ambientLightOn, setAmbientLightOn] = useState<boolean>(true);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);
  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const quickXTween = useRef<gsap.QuickToFunc | null>(null);
  const quickYTween = useRef<gsap.QuickToFunc | null>(null);

  const jacketProduct =
    products.find((p) => p.slug === "platform-jacket") || products[0];
  const capProduct =
    products.find((p) => p.slug === "dusk-cap") || products[5];

  const handleTriggerFlash = useCallback(() => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 160);
  }, []);

  const handleToggleLight = useCallback(() => {
    playSwitchSound();
    setAmbientLightOn((prev) => !prev);
  }, [playSwitchSound]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsHeroVisible(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const proxyX = { val: 0 };
    const proxyY = { val: 0 };

    quickXTween.current = gsap.quickTo(proxyX, "val", {
      duration: 0.22,
      ease: "power2.out",
      onUpdate: () => {
        container.style.setProperty("--flashlight-x", `${proxyX.val}px`);
      },
    });

    quickYTween.current = gsap.quickTo(proxyY, "val", {
      duration: 0.22,
      ease: "power2.out",
      onUpdate: () => {
        container.style.setProperty("--flashlight-y", `${proxyY.val}px`);
      },
    });

    container.style.setProperty("--flashlight-x", "50%");
    container.style.setProperty("--flashlight-y", "50%");

    return () => {
      gsap.killTweensOf(proxyX);
      gsap.killTweensOf(proxyY);
    };
  }, [reducedMotion]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      mousePosRef.current = { x: e.clientX, y: e.clientY, active: true };

      if (!reducedMotion) {
        if (quickXTween.current) quickXTween.current(localX);
        if (quickYTween.current) quickYTween.current(localY);

        const normX = (localX / rect.width - 0.5) * 2;
        const normY = (localY / rect.height - 0.5) * 2;
        setParallaxOffset({ x: normX * 12, y: normY * 8 });
      }
    },
    [reducedMotion]
  );

  const handlePointerLeave = useCallback(() => {
    mousePosRef.current.active = false;
    if (!reducedMotion) setParallaxOffset({ x: 0, y: 0 });
  }, [reducedMotion]);

  const paralaxTransform = (depth: number) =>
    reducedMotion
      ? "translateX(-50%)"
      : `translate3d(calc(-50% + ${parallaxOffset.x * depth}px), ${parallaxOffset.y * depth}px, 0)`;

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[100dvh] bg-carbon overflow-hidden select-none flex flex-col justify-between pt-24 pb-4"
      aria-label="Interactive Hero: The Hook Rail scene"
    >
      {/* Wall texture */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/assets/hero/wall-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
      </div>

      {/* Atmospheric flashlight & ambient glow */}
      <FlashlightMask ambientLightOn={ambientLightOn} isFlashing={isFlashing} />

      {/* ── Top status bar ── */}
      <div
        className="relative z-30 max-w-5xl mx-auto w-full px-4 sm:px-6 flex justify-between items-center"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 text-concrete font-mono text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-bordo animate-pulse" />
          <span className="tracking-widest uppercase">
            SCENE 01 / {ambientLightOn ? "AMBIENT LIGHT ON" : "FLASHLIGHT MODE"}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-concrete font-mono text-[11px] tracking-wider uppercase">
          <span>{isMuted ? "[AUDIO MUTED]" : "[AUDIO ON]"}</span>
          <span>•</span>
          <span>HOVER / CLICK TO EXPLORE</span>
        </div>
      </div>

      {/* ══ CENTRUL SCENEI: BARA ȘI OBIECTELE EXACT ALINIATE MATEMATIC PE CUIE ══ */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 my-auto py-2">
        {/* Suportul metalic (cu cuie la 10%, 30%, 50%, 70%, 90%) */}
        <HookRail className="mb-0" />

        {/* ── Desktop & Tablet (≥ 768px): POZIȚIONARE ABSOLUTĂ PE FIECARE CUI ── */}
        <div className="hidden md:block relative w-full h-[470px]">
          {/* CUI 1 (10%): Geaca (Platform Jacket) */}
          <div
            className="absolute top-[-10px] left-[10%]"
            style={{
              transform: paralaxTransform(0.6),
              transition: "transform 0.15s ease-out",
            }}
          >
            <GarmentObject
              product={jacketProduct}
              imageSrc="/assets/hero/jacket.png"
              alt="Platform Selvedge Denim Jacket"
              widthClass="w-[280px] lg:w-[320px]"
              heightClass="h-[390px] lg:h-[440px]"
              imageSizes="(max-width: 1024px) 280px, 320px"
            />
          </div>

          {/* CUI 2 (30%): Camera foto compactă */}
          <div
            className="absolute top-[-4px] left-[30%]"
            style={{
              transform: paralaxTransform(1.2),
              transition: "transform 0.15s ease-out",
            }}
          >
            <CameraObject
              onTriggerFlash={handleTriggerFlash}
              playShutterSound={playShutterSound}
              isMuted={isMuted}
              onToggleMute={toggleMute}
            />
          </div>

          {/* CUI 3 (50%): Căștile cu cablu verlet */}
          <div
            className="absolute top-[-2px] left-[50%] z-10"
            style={{
              transform: paralaxTransform(0.9),
              transition: "transform 0.15s ease-out",
            }}
          >
            <EarbudsCable isVisible={isHeroVisible} mousePosRef={mousePosRef} />
          </div>

          {/* CUI 4 (70%): Șapca (Dusk Cap) */}
          <div
            className="absolute top-[-4px] left-[70%]"
            style={{
              transform: paralaxTransform(0.8),
              transition: "transform 0.15s ease-out",
            }}
          >
            <GarmentObject
              product={capProduct}
              imageSrc="/assets/hero/cap.png"
              alt="Washed Gray Dusk Cap"
              widthClass="w-[190px] lg:w-[220px]"
              heightClass="h-[170px] lg:h-[195px]"
              imageSizes="(max-width: 1024px) 190px, 220px"
            />
          </div>

          {/* CUI 5 (90%): Photocard cu inel metalic */}
          <div
            className="absolute top-[-6px] left-[90%]"
            style={{
              transform: paralaxTransform(1.3),
              transition: "transform 0.15s ease-out",
            }}
          >
            <PhotocardObject />
          </div>

          {/* Comutatorul cu lanț (LightSwitch) plasat la extremitatea dreaptă a barei, în siguranță după photocard */}
          <div className="absolute -top-3 -right-3 z-30">
            <LightSwitch isOn={ambientLightOn} onToggle={handleToggleLight} />
          </div>
        </div>

        {/* ── Mobile (< 768px) ── */}
        <div className="md:hidden flex flex-col items-center gap-4 pt-2 pb-2">
          <div className="self-stretch flex items-center justify-between px-3 py-2 border border-concrete/20 bg-asphalt/80">
            <span className="font-mono text-[11px] text-concrete tracking-widest uppercase">
              Room Light
            </span>
            <button
              type="button"
              onClick={handleToggleLight}
              className={`px-3 py-1 font-mono text-[11px] tracking-widest uppercase border transition-colors min-h-[44px] min-w-[44px] ${
                ambientLightOn
                  ? "border-bordo bg-oxblood text-fog"
                  : "border-concrete/30 bg-carbon text-concrete"
              }`}
            >
              {ambientLightOn ? "ON" : "OFF"}
            </button>
          </div>

          <div className="flex justify-center w-full">
            <GarmentObject
              product={jacketProduct}
              imageSrc="/assets/hero/jacket.png"
              alt="Platform Selvedge Denim Jacket"
              widthClass="w-[220px]"
              heightClass="h-[280px]"
              imageSizes="220px"
            />
          </div>

          <div className="flex items-end justify-center gap-6 w-full">
            <CameraObject
              onTriggerFlash={handleTriggerFlash}
              playShutterSound={playShutterSound}
              isMuted={isMuted}
              onToggleMute={toggleMute}
            />
            <PhotocardObject />
          </div>

          <div className="flex items-end justify-center gap-6 w-full">
            <GarmentObject
              product={capProduct}
              imageSrc="/assets/hero/cap.png"
              alt="Washed Gray Dusk Cap"
              widthClass="w-[120px]"
              heightClass="h-[110px]"
              imageSizes="120px"
            />
            <div className="shrink-0">
              <EarbudsCable isVisible={isHeroVisible} mousePosRef={mousePosRef} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero bottom CTA ── */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-4 sm:px-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left space-y-1">
          <p className="font-mono text-xs tracking-widest text-concrete uppercase">
            DROP 01 // LAST TRAIN
          </p>
          <p className="font-display font-medium text-sm sm:text-base text-fog tracking-tight">
            &ldquo;{brandConfig.tagline}&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href="#drop-01">
            <Button
              variant="primary"
              size="lg"
              className="group flex items-center gap-3 cursor-pointer shadow-lg px-6 py-3 uppercase tracking-wider text-[13px] font-bold"
            >
              <span>View the collection</span>
              <ArrowRightIcon
                size={16}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </Button>
          </a>
        </div>
      </div>

      {/* Monumental Cropped Wordmark */}
      <HeroWordmark parallaxOffset={parallaxOffset} ambientLightOn={ambientLightOn} />
    </section>
  );
}
