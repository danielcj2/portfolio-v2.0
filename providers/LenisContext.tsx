"use client";

import type Lenis from "lenis";
import React, { createContext, useContext, useRef } from "react";

export const LenisContext = createContext<React.RefObject<Lenis | null> | null>(
  null,
);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}

export function useLenisRef() {
  const context = useContext(LenisContext);
  if (!context)
    throw new Error("useLenisRef must be used within a LenisProvider");

  return context;
}

export function useLenisScroll() {
  const lenisRef = useLenisRef();

  const scrollTo = (id: string) => {
    const target = id.startsWith("#") ? id : `#${id}`;
    lenisRef.current?.scrollTo(target, {
      duration: 3,
      easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    });
  };

  return { scrollTo };
}
