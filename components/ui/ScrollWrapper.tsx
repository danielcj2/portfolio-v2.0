"use client";

import Lenis from "lenis";

import { useEffect, useRef } from "react";
import { cancelFrame, frame, FrameData } from "motion/react";
import { useLenisRef } from "@/providers/LenisContext";
import { useScrollContainer } from "@/providers/ScrollContext";

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

    function update(data: FrameData) {
      const time = data.timestamp;
      lenis.raf(time);
    }

    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <div
      id="scroll-container"
      className="relative h-screen w-screen overflow-auto will-change-scroll"
      ref={wrapper}
    >
      <main className="bg-background h-min w-full font-sans" ref={content}>
        {children}
      </main>
    </div>
  );
};

export default ScrollWrapper;
