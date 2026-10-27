import type { Metadata } from "next";
import { Unbounded, IBM_Plex_Mono, Inter } from "next/font/google";
import { brandConfig } from "@/config/brand";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import "./globals.css";

const displayFont = Unbounded({
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brandConfig.name} — ${brandConfig.tagline}`,
  description: `${brandConfig.concept} Dark urban casual / Seoul night streetwear.`,
  keywords: ["streetwear", "quiet hours", "nocturnal clothing", "seoul streetwear", "fashion"],
  openGraph: {
    title: `${brandConfig.name} — ${brandConfig.tagline}`,
    description: brandConfig.concept,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${monoFont.variable} ${bodyFont.variable} scroll-smooth`}
    >
      <body className="bg-carbon text-fog font-body antialiased min-h-screen selection:bg-bordo selection:text-fog overflow-x-hidden">
        {/* Skip to main content link for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-bordo focus:text-fog focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase focus:outline-none"
        >
          Skip to content
        </a>

        {/* Subtle fixed film-grain overlay (4 to 6% opacity, pointer-events: none) */}
        <GrainOverlay />
        
        {/* Soft Vignette around screen edges */}
        <div 
          className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(11,12,14,0.65)_100%)]" 
          aria-hidden="true" 
        />
        
        {/* Page Content */}
        <div id="main-content" className="relative z-10 flex flex-col min-h-screen" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  );
}
