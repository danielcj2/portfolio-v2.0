"use client";

import Lenis from "lenis";
import TVStage from "../tv/TVStage";

import { useEffect, useRef } from "react";
import { useLenisRef } from "@/providers/LenisContext";
import { useScrollContainer } from "@/providers/ScrollContext";
import { useAnimationFrame } from "motion/react";

const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const wrapper = useScrollContainer();
  const lenisRef = useLenisRef();
  const content = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      wrapper: wrapper.current ?? undefined,
      content: content.current ?? undefined,
      // infinite: true,
      // syncTouch: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, [lenisRef, wrapper]);

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return (
    <div
      id="scroll-container"
      className="relative h-screen w-screen overflow-auto"
      ref={wrapper}
    >
      <main
        className="bg-background relative z-0 h-min w-full font-sans"
        ref={content}
      >
        {children}
        {/* <TVStage /> */}
      </main>
    </div>
  );
};

export default ScrollWrapper;
