"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame, type FrameData } from "motion/react";
import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = ({ timestamp }: FrameData) => {
      lenisRef.current?.lenis?.raf(timestamp);
    };

    frame.setup(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
