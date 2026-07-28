"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circle" | "rect" | "card";
}

export function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  const variants = {
    text: "h-4 w-full rounded",
    circle: "h-12 w-12 rounded-full",
    rect: "h-32 w-full rounded-lg",
    card: "h-64 w-full rounded-xl glass",
  };

  return (
    <div
      className={cn(
        "bg-white/5 animate-pulse relative overflow-hidden",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}
