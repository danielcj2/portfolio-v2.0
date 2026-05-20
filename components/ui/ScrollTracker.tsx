"use client";

import { useScrollContainer } from "@/providers/ScrollContext";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

const ScrollTracker = () => {
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container });
  const [progress, setProgress] = useState<number>(0);
  const progressRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.round(latest * 100);
    if (next === progressRef.current) return;
    progressRef.current = next;
    setProgress(next);
  });

  return (
    <output
      aria-label="Scroll progress"
      className="text-foreground font-chakra mr-4 inline-block w-[3ch] font-medium tabular-nums"
    >
      {progress}%
    </output>
  );
};

export default ScrollTracker;
