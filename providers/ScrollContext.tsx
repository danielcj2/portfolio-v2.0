"use client";

import React, { createContext, useContext, useRef } from "react";

export const ScrollContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ScrollContext.Provider value={ref}>{children}</ScrollContext.Provider>
  );
}

export function useScrollContainer() {
  const context = useContext(ScrollContext);
  if (!context)
    throw new Error("useScrollContainer must be used within a ScrollProvider");

  return context;
}
