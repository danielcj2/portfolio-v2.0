"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

const ScrollTracker = () => {
  const { scrollYProgress } = useScroll();
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
      className="text-foreground font-mono mr-4 inline-block w-[3ch] tabular-nums"
    >
      {progress}%
    </output>
  );
};

export default ScrollTracker;
