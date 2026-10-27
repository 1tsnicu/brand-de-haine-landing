"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseScrollClockOptions {
  cityLabel?: string;
  targetHour?: number; // hour to arrive at (e.g. 4 for 04:00)
}

/**
 * Maps the scroll progression of the page (0 to 1) into nocturnal timeline hours,
 * progressing gracefully from initial local midnight hours to deep stillness (04:47).
 */
export function useScrollClock({
  cityLabel = "CHIȘINĂU",
  targetHour = 4,
}: UseScrollClockOptions = {}): string {
  const reducedMotion = useReducedMotion();
  const [displayTime, setDisplayTime] = useState<string>("");

  useEffect(() => {
    // Determine base initial hour
    const now = new Date();
    const baseHour = now.getHours();
    const baseMinute = now.getMinutes();

    const updateClock = () => {
      if (reducedMotion) {
        setDisplayTime(
          `${String(baseHour).padStart(2, "0")}:${String(baseMinute).padStart(2, "0")} — ${cityLabel}`
        );
        return;
      }

      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Update dynamic night depth on document root
      document.documentElement.style.setProperty("--night-depth", progress.toFixed(3));

      // Interpolate from 02:47 towards target 04:47
      const startMinutesTotal = 2 * 60 + 47; // 02:47
      const endMinutesTotal = targetHour * 60 + 47; // e.g. 04:47
      const currentTotal = Math.round(startMinutesTotal + (endMinutesTotal - startMinutesTotal) * progress);

      const h = Math.floor(currentTotal / 60) % 24;
      const m = currentTotal % 60;

      setDisplayTime(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} — ${cityLabel}`
      );
    };

    updateClock();
    window.addEventListener("scroll", updateClock, { passive: true });
    return () => window.removeEventListener("scroll", updateClock);
  }, [cityLabel, targetHour, reducedMotion]);

  return displayTime;
}
