export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  concept: string;
  primaryCity: string;
  secondaryCity: string;
  timezone: string;
  secondaryTimezone: string;
  tickerText: string;
  nextDropDate: string; // ISO date or display string
  navItems: Array<{ label: string; href: string }>;
  currency: {
    symbol: string;
    code: string;
  };
}

export const brandConfig: BrandConfig = {
  name: "QUIET HOURS",
  shortName: "QH",
  tagline: "Wear it after dark.",
  concept: "Clothing for the hours when the city goes quiet.",
  primaryCity: "CHIȘINĂU",
  secondaryCity: "SEOUL",
  timezone: "Europe/Chisinau",
  secondaryTimezone: "Asia/Seoul",
  tickerText: "FREE SHIPPING OVER €80 • NUMBERED PHOTOCARD INCLUDED • DROP 01 LIVE",
  nextDropDate: "2026-11-11T00:00:00+02:00",
  navItems: [
    { label: "Drop 01", href: "#drop-01" },
    { label: "Lookbook", href: "#lookbook" },
    { label: "Up close", href: "#up-close" },
    { label: "About", href: "#manifesto" },
  ],
  currency: {
    symbol: "€",
    code: "EUR",
  },
};

