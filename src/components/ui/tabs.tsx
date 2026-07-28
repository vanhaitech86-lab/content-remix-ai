"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── compound‑component context ─── */

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue>({ activeTab: "", setActiveTab: () => {} });

/* ─── Root ─── */

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  /** Legacy prop-driven API – pass tabs array instead of children */
  tabs?: { id: string; label: React.ReactNode; content: React.ReactNode }[];
  defaultTab?: string;
}

export function Tabs({ defaultValue, value, onValueChange, children, className, tabs, defaultTab }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue || defaultTab || "");
  const active = value ?? internal;

  const handleChange = (id: string) => {
    setInternal(id);
    onValueChange?.(id);
  };

  // Legacy array-driven API
  if (tabs && tabs.length > 0) {
    const legacyActive = active || tabs[0].id;
    return (
      <div className={cn("w-full flex flex-col", className)}>
        <div className="flex items-center gap-6 border-b border-white/10 overflow-x-auto custom-scrollbar relative">
          {tabs.map((tab) => {
            const isAct = legacyActive === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleChange(tab.id)}
                className={cn(
                  "relative py-4 px-2 text-sm font-medium transition-colors whitespace-nowrap",
                  isAct ? "text-white" : "text-white/60 hover:text-white/90"
                )}
              >
                {tab.label}
                {isAct && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] rounded-t-full shadow-[0_-2px_10px_rgba(124,58,237,0.5)]" />
                )}
              </button>
            );
          })}
        </div>
        <div className="py-6 animate-in fade-in duration-300">
          {tabs.find((t) => t.id === (legacyActive))?.content}
        </div>
      </div>
    );
  }

  // Compound-component API
  return (
    <TabsContext.Provider value={{ activeTab: active, setActiveTab: handleChange }}>
      <div className={cn("w-full flex flex-col", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

/* ─── TabsList ─── */

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 border-b border-white/10 overflow-x-auto custom-scrollbar relative p-1 rounded-lg bg-white/5", className)}>
      {children}
    </div>
  );
}

/* ─── TabsTrigger ─── */

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "relative py-2.5 px-4 text-sm font-medium transition-all whitespace-nowrap rounded-md",
        isActive
          ? "text-white bg-gradient-to-r from-brand-600/80 to-electric-600/80 shadow-md"
          : "text-white/60 hover:text-white/90 hover:bg-white/5",
        className
      )}
    >
      {children}
    </button>
  );
}

/* ─── TabsContent ─── */

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div className={cn("py-4 animate-in fade-in duration-300", className)}>{children}</div>;
}
