"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: Step[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function Stepper({ steps, currentStepIndex, onStepClick, className }: StepperProps) {
  return (
    <div className={cn("w-full overflow-x-auto custom-scrollbar pb-4", className)}>
      <div className="min-w-max flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isClickable = onStepClick && (isCompleted || isCurrent);

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "flex flex-col items-center gap-2 relative z-10 w-24",
                  isClickable ? "cursor-pointer" : "cursor-default"
                )}
                onClick={() => isClickable && onStepClick?.(index)}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                    isCompleted
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] border-transparent text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                      : isCurrent
                      ? "bg-[#1A1533] border-[#7C3AED] text-[#9F67FF] shadow-[0_0_10px_rgba(124,58,237,0.2)]"
                      : "bg-[#1A1533] border-white/10 text-white/40"
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.icon || <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium text-center transition-colors",
                    isCurrent ? "text-white" : isCompleted ? "text-white/80" : "text-white/40"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 relative top-[-10px] bg-white/10 min-w-[30px]">
                  <div
                    className={cn(
                      "absolute top-0 left-0 h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-500 ease-out",
                      index < currentStepIndex ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
