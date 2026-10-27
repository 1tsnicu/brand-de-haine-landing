"use client";

import { useEffect, useState } from "react";

interface LiveClockOptions {
  timeZone?: string;
  cityLabel?: string;
  includeSeconds?: boolean;
}

export function useLiveClock({
  timeZone = "Europe/Chisinau",
  cityLabel = "CHIȘINĂU",
  includeSeconds = false,
}: LiveClockOptions = {}) {
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          ...(includeSeconds ? { second: "2-digit" } : {}),
          hour12: false,
        }).format(now);

        setFormattedTime(cityLabel ? `${timeStr} — ${cityLabel}` : timeStr);
      } catch (err) {
        // Fallback in case Intl timezone fails
        const d = new Date();
        const pad = (n: number) => n.toString().padStart(2, "0");
        const fallback = `${pad(d.getHours())}:${pad(d.getMinutes())}${includeSeconds ? `:${pad(d.getSeconds())}` : ""}`;
        setFormattedTime(cityLabel ? `${fallback} — ${cityLabel}` : fallback);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone, cityLabel, includeSeconds]);

  return formattedTime;
}

