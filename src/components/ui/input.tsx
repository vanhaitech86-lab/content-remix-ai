"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: "default" | "filled";
  leftIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      variant = "default",
      leftIcon,
      multiline,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const baseInputStyles = cn(
      "w-full rounded-lg transition-all duration-300 text-white placeholder:text-white/40 outline-none focus-ring",
      variant === "default"
        ? "bg-[#1A1533]/50 border border-white/10 focus:border-[#7C3AED]/50"
        : "bg-white/5 border-transparent focus:bg-white/10 focus:border-[#7C3AED]/50 border",
      error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
      leftIcon ? "pl-10 pr-4 py-2" : "px-4 py-2"
    );

    const Wrapper = multiline ? "textarea" : "input";

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)}>
        {label && (
          <label className="text-sm font-medium text-white/90 ml-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && !multiline && (
            <div className="absolute left-3 text-white/50 pointer-events-none">
              {leftIcon}
            </div>
          )}
          {multiline ? (
            <textarea
              ref={ref as any}
              rows={rows}
              className={cn(baseInputStyles, "resize-y min-h-[80px]")}
              {...(props as any)}
            />
          ) : (
            <input
              ref={ref as any}
              className={baseInputStyles}
              {...(props as any)}
            />
          )}
        </div>
        {(helperText || error) && (
          <p
            className={cn(
              "text-xs ml-1",
              error ? "text-red-400" : "text-white/50"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
