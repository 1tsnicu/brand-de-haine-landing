"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";

interface GarmentObjectProps {
  product: Product;
  imageSrc: string;
  alt: string;
  widthClass?: string;
  heightClass?: string;
  className?: string;
  style?: React.CSSProperties;
  labelPosition?: "bottom" | "top";
  /** Sizes hint string passed for priority attribute on Next Image */
  imageSizes?: string;
}

export function GarmentObject({
  product,
  imageSrc,
  alt,
  widthClass = "w-[280px] sm:w-[340px]",
  heightClass = "h-[380px] sm:h-[460px]",
  className = "",
  style,
  labelPosition = "bottom",
  imageSizes = "(max-width: 768px) 280px, 400px",
}: GarmentObjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const openQuickView = useCartStore((state) => state.openQuickView);

  const handleClick = () => openQuickView(product);

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
      <button
        type="button"
        aria-label={`${product.name}, ${formatCurrency(product.price)}. Press to open quick view.`}
        onClick={handleClick}
        className={`relative ${widthClass} ${heightClass} cursor-pointer text-left block p-0 bg-transparent border-0 transition-transform duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bordo focus-visible:ring-offset-1 focus-visible:ring-offset-carbon ${
          isHovered ? "-translate-y-4 scale-[1.025]" : "translate-y-0"
        }`}
      >
        {/* Realistic wall contact shadow */}
        <div
          className={`absolute inset-x-8 top-6 bottom-4 bg-black/85 blur-2xl pointer-events-none rounded-3xl transition-all duration-300 ${
            isHovered ? "opacity-100 scale-105 translate-y-4" : "opacity-60 scale-95 translate-y-2"
          }`}
          aria-hidden="true"
        />

        {/* Soft shadow that deepens on hover */}
        <div
          className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-10 rounded-full transition-all duration-300 ${
            isHovered
              ? "opacity-90 blur-2xl scale-110 bg-black/90"
              : "opacity-40 blur-xl scale-90 bg-black/70"
          }`}
          aria-hidden="true"
        />

        {/* Object Image */}
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            priority
            sizes={imageSizes}
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* Floating Mono Label — 13px, more readable */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-2 border border-concrete/35 bg-carbon/97 backdrop-blur-md pointer-events-none transition-all duration-200 z-30 shadow-xl ${
            labelPosition === "bottom" ? "-bottom-11" : "-top-11"
          } ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 sm:opacity-0 sm:group-focus-visible:opacity-100"
          }`}
        >
          <span className="font-mono text-[13px] tracking-wide uppercase text-fog">
            <span className="text-bordo mr-1.5">•</span>
            <span className="font-medium">{product.name}</span>
            <span className="text-concrete/70 mx-2">|</span>
            <span className="font-bold">{formatCurrency(product.price)}</span>
          </span>
        </div>
      </button>
    </div>
  );
}
