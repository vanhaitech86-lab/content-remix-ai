"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "brand" | "outline" | "secondary";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", dot, children, ...props }, ref) => {
    const variants = {
      default: "bg-white/10 text-white border-white/20",
      outline: "bg-transparent text-white border-white/20",
      secondary: "bg-white/5 text-white/80 border-white/10 hover:bg-white/10",
      success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      danger: "bg-red-500/10 text-red-400 border-red-500/20",
      info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      brand: "bg-[#7C3AED]/20 text-[#9F67FF] border-[#7C3AED]/30",
    };

    const dotColors = {
      default: "bg-white",
      outline: "bg-white",
      secondary: "bg-white/80",
      success: "bg-emerald-400",
      warning: "bg-amber-400",
      danger: "bg-red-400",
      info: "bg-blue-400",
      brand: "bg-[#9F67FF]",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-full border",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse",
              dotColors[variant]
            )}
          />
        )}
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";
