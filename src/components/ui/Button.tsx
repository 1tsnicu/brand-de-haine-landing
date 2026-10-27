import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-mono uppercase tracking-wider text-xs transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-bordo focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed";

    const variants = {
      // 90/10 rule: Bordo is used as a button fill with fog text
      primary: "bg-bordo text-fog hover:bg-bordo-light active:scale-[0.98] shadow-sm",
      secondary: "bg-asphalt text-fog border border-concrete/30 hover:border-fog/50 hover:bg-asphalt/80",
      outline: "bg-transparent text-fog border border-concrete/40 hover:border-fog hover:text-fog",
      ghost: "bg-transparent text-concrete hover:text-fog hover:bg-asphalt/50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-[11px]",
      md: "px-5 py-3 text-xs tracking-widest",
      lg: "px-7 py-4 text-xs tracking-[0.2em]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

