"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { useCartStore } from "@/store/useCartStore";
import { useLiveClock } from "@/hooks/useLiveClock";
import { useScrollClock } from "@/hooks/useScrollClock";
import { useActiveSection } from "@/hooks/useActiveSection";
import { BagIcon, CloseIcon } from "@/components/ui/Icons";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalCartCount = useCartStore((state) => state.getTotalCount());
  const openDrawer = useCartStore((state) => state.openDrawer);

  const liveTime = useLiveClock({
    timeZone: brandConfig.timezone,
    cityLabel: brandConfig.primaryCity,
  });

  const scrollTime = useScrollClock({
    cityLabel: brandConfig.primaryCity,
    targetHour: 4,
  });

  const activeClockTime = isScrolled ? scrollTime : (liveTime || `02:47 — ${brandConfig.primaryCity}`);

  const activeSectionId = useActiveSection(["manifesto", "drop-01", "lookbook", "up-close"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on nav item click
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-carbon/85 backdrop-blur-md border-b border-concrete/15 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo Mark */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-bordo rounded"
            aria-label={`${brandConfig.name} — Return to homepage`}
          >
            <span className="font-display font-black text-xl tracking-tighter text-fog group-hover:text-bordo transition-colors">
              {brandConfig.shortName}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-bordo" />
          </Link>
        </div>

        {/* Live Clock (Top Center) */}
        <div className="flex items-center justify-center min-w-0">
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded border border-concrete/25 bg-carbon/75 backdrop-blur-sm font-mono text-[12px] sm:text-[13px] tracking-wider text-fog font-medium shadow-sm"
            aria-live="polite"
            aria-label="Current local time in Chișinău"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bordo animate-pulse shrink-0" aria-hidden="true" />
            <span className="truncate">{activeClockTime}</span>
          </div>
        </div>

        {/* Desktop Nav Links & Cart */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <nav
            className="hidden md:flex items-center gap-7 font-mono text-[13px] uppercase tracking-wider text-mist font-medium"
            aria-label="Main navigation"
          >
            {brandConfig.navItems.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSectionId === targetId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`transition-all py-1 focus-visible:outline-bordo rounded relative ${
                    isActive
                      ? "text-fog font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-bordo"
                      : "hover:text-fog"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={openDrawer}
            className="relative flex items-center justify-center gap-2 text-fog hover:text-bordo transition-colors min-h-[44px] min-w-[44px] px-2 focus-visible:outline-bordo rounded cursor-pointer"
            aria-label={`Open shopping bag — ${totalCartCount} ${totalCartCount === 1 ? "item" : "items"}`}
          >
            <BagIcon size={20} />
            <span className="font-mono text-[13px] hidden sm:inline tracking-wider font-medium">CART</span>
            {totalCartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-bordo text-fog font-mono text-[11px] font-bold leading-none">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-mist hover:text-fog transition-colors focus-visible:outline-bordo rounded cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <CloseIcon size={22} />
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Nav Menu */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out border-t border-concrete/15 bg-carbon/95 backdrop-blur-md ${
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col py-4 px-4 gap-1 font-mono text-[14px] uppercase tracking-wider text-mist" role="list">
          {brandConfig.navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={handleNavClick}
                className="flex items-center min-h-[44px] py-2 px-3 hover:text-fog hover:bg-asphalt/80 transition-colors focus-visible:outline-bordo rounded"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

