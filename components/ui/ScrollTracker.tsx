"use client";

import { useScrollContainer } from "@/providers/ScrollContext";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const ScrollTracker = () => {
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ container });
  const [progress, setProgress] = useState<number>(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(Math.round(latest * 100));
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
