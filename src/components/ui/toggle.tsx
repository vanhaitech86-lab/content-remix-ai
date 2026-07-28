"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked, onChange, label, disabled, className }: ToggleProps) {
  return (
    <label className={cn("flex items-center cursor-pointer", disabled && "opacity-50 cursor-not-allowed", className)}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={cn(
            "block w-12 h-6 rounded-full transition-colors duration-300",
            checked ? "bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]" : "bg-white/10"
          )}
        />
        <div
          className={cn(
            "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 flex items-center justify-center shadow-md",
            checked && "transform translate-x-6"
          )}
        >
          {checked && (
            <svg className="w-2.5 h-2.5 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      {label && <span className="ml-3 text-sm font-medium text-white/90">{label}</span>}
    </label>
  );
}
