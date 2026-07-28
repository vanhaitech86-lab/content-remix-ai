"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps {
  value?: number; // 0 to 100
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  indeterminate?: boolean;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({
  value = 0,
  max = 100,
  size = "md",
  showLabel = false,
  indeterminate = false,
  className,
  indicatorClassName,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {showLabel && !indeterminate && (
        <div className="flex justify-between text-xs font-medium text-white/70">
          <span>Tiến trình</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-white/10 rounded-full overflow-hidden", sizes[size])}>
        {indeterminate ? (
          <div className={cn("h-full bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#7C3AED] bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] rounded-full", indicatorClassName)} />
        ) : (
          <div
            className={cn("h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] rounded-full transition-all duration-500 ease-out relative shadow-[0_0_10px_rgba(59,130,246,0.5)]", indicatorClassName)}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}
