"use client";

import Lenis from "lenis";
import r48Mask from "@/images/r48.svg?url";
import r36Mask from "@/images/r36.svg?url";

import { useEffect, useRef } from "react";
import { cancelFrame, frame, FrameData } from "motion/react";
import { useLenisRef } from "@/providers/LenisContext";
import { useScrollContainer } from "@/providers/ScrollContext";
import { useMediaQuery } from "@/providers/MediaQueryContext";

const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const wrapper = useScrollContainer();
  const lenisRef = useLenisRef();
  const content = useRef<HTMLElement>(null);
  const { isMobile } = useMediaQuery();

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
  }, [lenisRef, wrapper]);

  return (
    <div
      id="scroll-container"
      className="relative h-screen w-screen overflow-auto will-change-scroll"
      ref={wrapper}
      style={{
        maskImage: `url(${isMobile ? r36Mask : r48Mask})`,
        WebkitMaskImage: `url(${isMobile ? r36Mask : r48Mask})`,
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: `calc(100% - var(--gap) * 2) calc(100% - var(--gap) * 2)`,
        WebkitMaskSize: `calc(100% - var(--gap) * 2) calc(100% - var(--gap) * 2)`,
      }}
    >
      <main className="bg-background h-min w-full font-sans" ref={content}>
        {children}
      </main>
    </div>
  );
};

export default ScrollWrapper;
