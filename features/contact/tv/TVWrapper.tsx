"use client";

import { useMemo, useRef } from "react";
import { motionValue, useScroll } from "motion/react";
import { useMediaQuery } from "@/providers/MediaQueryContext";
import { useScrollContainer } from "@/providers/ScrollContext";
import {
  CONTACT_HEIGHT,
  FOOTER_REVEAL_BUFFER,
  TV_TOTAL_HEIGHT,
} from "@/lib/layoutHeights";
import TV from "./TV";

const TVWrapper = () => {
  const target = useRef<HTMLDivElement>(null);
  const container = useScrollContainer();
  const { isMobile } = useMediaQuery();
  const mobileProgress = useMemo(() => motionValue(1), []);

  const { scrollYProgress } = useScroll({
    target,
    container,
    offset: ["start center", "end end"],
  });

  const progress = isMobile ? mobileProgress : scrollYProgress;

  return (
    <div
      className="relative w-full overflow-clip"
      style={{ height: isMobile ? "100vh" : TV_TOTAL_HEIGHT }}
      ref={target}
    >
      {!isMobile && (
        <div
          className="bg-background-v2 pointer-events-none absolute inset-x-0 top-0 z-10"
          style={{ height: CONTACT_HEIGHT }}
          aria-hidden
        />
      )}
      <div
        className="bg-background pointer-events-none absolute inset-x-0 bottom-0 z-1"
        style={{ height: FOOTER_REVEAL_BUFFER }}
        aria-hidden
      />
      <TV progress={progress} />
    </div>
  );
};

export default TVWrapper;
