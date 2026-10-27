import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "bordo" | "subtle";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "border-concrete/30 bg-asphalt/60 text-fog",
    bordo: "border-bordo/50 bg-oxblood/40 text-fog",
    subtle: "border-concrete/20 bg-carbon/80 text-concrete",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

