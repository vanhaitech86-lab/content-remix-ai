"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─── types ─── */

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

/* ─── compound-component context ─── */

interface SelectContextValue {
  value: string;
  onValueChange: (v: string) => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  placeholder: string;
}

const SelectContext = createContext<SelectContextValue>({
  value: "",
  onValueChange: () => {},
  isOpen: false,
  setIsOpen: () => {},
  placeholder: "Chọn...",
});

/* ─── Root (compound API) ─── */

export interface SelectRootProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  defaultValue?: string;
}

export function SelectRoot({ value: controlled, onValueChange, children, defaultValue }: SelectRootProps) {
  const [internal, setInternal] = useState(defaultValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const val = controlled ?? internal;

  const handleChange = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value: val, onValueChange: handleChange, isOpen, setIsOpen, placeholder: "Chọn..." }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

/* ─── SelectTrigger ─── */

export function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen, setIsOpen } = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "flex items-center justify-between w-full px-4 py-2 text-left bg-[#1A1533]/50 border rounded-lg transition-all duration-300",
        isOpen ? "border-[#7C3AED]/50 bg-white/5" : "border-white/10 hover:bg-white/5",
        className
      )}
    >
      <span className="truncate text-sm">{children}</span>
      <svg className={cn("w-4 h-4 text-white/50 transition-transform duration-300 ml-2 flex-shrink-0", isOpen && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

/* ─── SelectValue ─── */

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = useContext(SelectContext);
  return <span className={cn(!value && "text-white/40")}>{value || placeholder || "Chọn..."}</span>;
}

/* ─── SelectContent ─── */

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen, setIsOpen } = useContext(SelectContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // check if clicking the trigger
        const parent = ref.current.parentElement;
        if (parent && !parent.contains(e.target as Node)) {
          setIsOpen(false);
        }
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className={cn("absolute z-50 w-full mt-2 bg-[#1A1533] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1", className)}>
      <ul className="max-h-60 overflow-y-auto custom-scrollbar">{children}</ul>
    </div>
  );
}

/* ─── SelectItem ─── */

export function SelectItem({ value: itemValue, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { value, onValueChange } = useContext(SelectContext);
  const isSelected = value === itemValue;

  return (
    <li
      onClick={() => onValueChange(itemValue)}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors text-sm",
        isSelected ? "bg-[#7C3AED]/20 text-[#9F67FF]" : "text-white hover:bg-white/10",
        className
      )}
    >
      {children}
      {isSelected && (
        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </li>
  );
}

/* ─── Unified Select API ─── */

export interface SelectProps {
  options?: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

function LegacySelect({
  options,
  value,
  onChange,
  placeholder = "Chọn...",
  label,
  helperText,
  error,
  className,
  disabled,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = (options || []).find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} ref={containerRef}>
      {label && <label className="text-sm font-medium text-white/90 ml-1">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between w-full px-4 py-2 text-left bg-[#1A1533]/50 border rounded-lg transition-all duration-300",
            isOpen ? "border-[#7C3AED]/50 bg-white/5" : "border-white/10",
            error && "border-red-500/50",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-white/5"
          )}
        >
          <span className={cn("flex items-center gap-2 truncate", !selectedOption ? "text-white/40" : "text-white")}>
            {selectedOption?.icon}
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg className={cn("w-4 h-4 text-white/50 transition-transform duration-300", isOpen && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-[#1A1533] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1">
            <ul className="max-h-60 overflow-y-auto custom-scrollbar">
              {(options || []).map((option) => (
                <li
                  key={option.value}
                  onClick={() => { onChange?.(option.value); setIsOpen(false); }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors text-sm",
                    value === option.value ? "bg-[#7C3AED]/20 text-[#9F67FF]" : "text-white hover:bg-white/10"
                  )}
                >
                  {option.icon}
                  {option.label}
                  {value === option.value && (
                    <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {(helperText || error) && (
        <p className={cn("text-xs ml-1", error ? "text-red-400" : "text-white/50")}>{error || helperText}</p>
      )}
    </div>
  );
}

export function Select(props: SelectProps) {
  // Compound component mode (shadcn-style) when children are provided and no options
  if (props.children && (!props.options || props.options.length === 0)) {
    return (
      <SelectRoot value={props.value} defaultValue={props.defaultValue} onValueChange={props.onValueChange || props.onChange}>
        {props.children}
      </SelectRoot>
    );
  }

  // Legacy mode with options prop
  return <LegacySelect {...props} />;
}

