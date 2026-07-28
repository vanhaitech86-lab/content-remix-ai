"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center glass rounded-2xl border-dashed border-2 border-white/10 bg-white/[0.02]",
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[#9F67FF] mb-4 shadow-[0_0_20px_rgba(124,58,237,0.1)]">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-white/60 max-w-sm mb-6">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
