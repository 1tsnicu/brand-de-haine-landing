"use client";

import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { useLiveClock } from "@/hooks/useLiveClock";
import { brandCopy } from "@/content/copy";

export function Footer() {
  const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const chisinauTime = useLiveClock({
    timeZone: brandConfig.timezone,
    cityLabel: brandConfig.primaryCity,
    includeSeconds: true,
  });

  const seoulTime = useLiveClock({
    timeZone: brandConfig.secondaryTimezone,
    cityLabel: brandConfig.secondaryCity,
    includeSeconds: true,
  });

  return (
    <footer
      className="relative w-full bg-carbon text-fog border-t border-concrete/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-concrete/15">
          {/* Brand & Concept */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block group focus-visible:outline-bordo">
              <span className="font-display font-black text-2xl tracking-tight text-fog group-hover:text-bordo transition-colors">
                {brandConfig.name}
              </span>
            </Link>
            <p className="font-mono text-[13px] text-mist leading-relaxed">
              &ldquo;{brandCopy.footer.brandTag}&rdquo;
            </p>
            <p className="font-mono text-[12px] text-mist/85 leading-relaxed">
              {brandCopy.footer.concept}
            </p>
          </div>

          {/* Nav: Collection */}
          <div className="space-y-3 font-mono text-[13px]">
            <h4 className="text-fog font-bold tracking-widest uppercase">
              {brandCopy.footer.colCollection}
            </h4>
            <ul className="space-y-2.5 text-mist">
              <li>
                <a href="#drop-01" className="hover:text-fog transition-colors">
                  Drop 01 &ldquo;Last Train&rdquo;
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-fog transition-colors">
                  Lookbook 02:00 — 05:00
                </a>
              </li>
              <li>
                <a href="#up-close" className="hover:text-fog transition-colors">
                  Up close // Macro
                </a>
              </li>
              <li>
                <a href="#photocard" className="hover:text-fog transition-colors">
                  Collectible Photocard
                </a>
              </li>
            </ul>
          </div>

          {/* Nav: Inquiries & Care */}
          <div className="space-y-3 font-mono text-[13px]">
            <h4 className="text-fog font-bold tracking-widest uppercase">
              {brandCopy.footer.colInfo}
            </h4>
            <ul className="space-y-2.5 text-mist">
              {brandCopy.footer.archiveItems.map((item, idx) => (
                <li key={idx}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dual Live Clocks */}
          <div className="space-y-3 font-mono text-[13px]">
            <h4 className="text-fog font-bold tracking-widest uppercase">
              {brandCopy.footer.colClocks}
            </h4>
            <div className="space-y-2.5">
              <div className="p-3 bg-carbon border border-concrete/25 flex items-center justify-between">
                <span className="text-mist text-[12px]">EET / TIMEZONE</span>
                <span className="text-fog font-semibold">
                  {chisinauTime || `00:00:00 — ${brandConfig.primaryCity}`}
                </span>
              </div>
              <div className="p-3 bg-carbon border border-concrete/25 flex items-center justify-between">
                <span className="text-mist text-[12px]">KST / TIMEZONE</span>
                <span className="text-fog font-semibold">
                  {seoulTime || `00:00:00 — ${brandConfig.secondaryCity}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[12px] text-mist">
          <div>
            © {year ?? "—"} {brandConfig.name}. {brandCopy.footer.rights}
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-fog cursor-pointer">TERMS</span>
            <span>•</span>
            <span className="hover:text-fog cursor-pointer">PRIVACY</span>
            <span>•</span>
            <span className="text-bordo-light font-bold">{brandCopy.footer.edition}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

