"use client";

import React from "react";
import { Header } from "@/components/sections/Header";
import { HeroScene } from "@/components/hero/HeroScene";
import { Manifesto } from "@/components/sections/Manifesto";
import { DropGrid } from "@/components/sections/DropGrid";
import { BrandStory } from "@/components/sections/BrandStory";
import { LookbookGrid } from "@/components/sections/LookbookGrid";
import { UpClose } from "@/components/sections/UpClose";
import { PhotocardSlide } from "@/components/sections/PhotocardSlide";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";
import { SectionDivider } from "@/components/sections/SectionDivider";
import { Ticker } from "@/components/ui/Ticker";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { QuickViewModal } from "@/components/shop/QuickViewModal";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-carbon text-fog relative flex flex-col selection:bg-bordo selection:text-fog">
      {/* 1. Header (Sticky, transparent over hero) */}
      <Header />

      {/* 2. Interactive Hero ("The Hook Rail" scene) */}
      <HeroScene />

      {/* Ticker separator */}
      <Ticker />

      {/* 3. Manifesto (Two large lines, scroll reveal) */}
      <Manifesto />

      <SectionDivider label="02:14 // FIRST CAPSULE" />

      {/* 4. Drop 01 "Last Train" (Pinned photos grid, rotation, hover swap) */}
      <DropGrid />

      {/* Interstitial Brand Story (Nocturnal Philosophy & Plate) */}
      <BrandStory />

      <SectionDivider label="02:47 // DOCUMENTARY" />

      {/* 5. Lookbook (Asymmetric grid, object-only photography, mono captions) */}
      <LookbookGrid />

      <SectionDivider label="03:30 // TEXTILES" />

      {/* 6. Up Close (Macro plates documenting selvedge, fleece, and die-cast zinc) */}
      <UpClose />

      <SectionDivider label="04:00 // ARCHIVE" />

      {/* 7. Photocard Section (Card sliding out of hoodie pocket animation) */}
      <PhotocardSlide />

      {/* 8. Newsletter ("Get the hour of the next drop.", validation, error states) */}
      <Newsletter />

      {/* 9. Footer (Logo, links, second live clock) */}
      <Footer />

      {/* Overlays: Cart Drawer & Product Quick-View Modal */}
      <CartDrawer />
      <QuickViewModal />
    </main>
  );
}
