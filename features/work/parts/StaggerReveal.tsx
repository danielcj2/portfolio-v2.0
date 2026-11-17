"use client";

import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useState } from "react";

type WordProps = {
  word: { text: string; double?: boolean };
  index: number;
  progress: MotionValue<number>;
};

const STAGGER = 0.025;
const DURATION = 0.075;
const CONVERGE_START = STAGGER * 5 + DURATION; // stagger * index + duration = 0.20
const CONVERGE_END = CONVERGE_START + 0.25; // 0.45

const Word = ({ word, index, progress }: WordProps) => {
  const max = word?.double ? 25 : 10;

  const opacity = useTransform(() => {
    const start = STAGGER * index;
    return Math.max(0, Math.min(1, (progress.get() - start) / DURATION));
  });

  const maxWidth = useTransform(
    progress,
    [CONVERGE_START, CONVERGE_END],
    [200, max],
  );

  const fade = useTransform(() => {
    const amount = Math.max(
      0,
      Math.min(
        1,
        (progress.get() - CONVERGE_START) / (CONVERGE_END - CONVERGE_START),
      ),
    );
    return 1 - amount * 0.95;
  });

  return (
    <motion.p
      layout
      className="relative cursor-text overflow-hidden"
      style={{ maxWidth, opacity: fade }}
    >
      {word.text}
      <motion.span
        className="bg-muted absolute inset-0 z-1"
        style={{ opacity }}
      />
    </motion.p>
  );
};

const StaggerReveal = ({ progress }: { progress: MotionValue<number> }) => {
  let wordIndex = 0;
  const [converged, setConverged] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setConverged(v >= CONVERGE_END);
  });

  return (
    <div className="-z-2 col-span-6 row-start-2 mb-6 self-center text-2xl leading-none font-medium tracking-[0.015em] md:text-[28px] xl:text-[32px]">
      <motion.div
        layout
        className={`text-muted flex justify-center ${converged ? "mb-0 gap-0" : "mb-2 gap-2"}`}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {["More", "than", "meets", "the", "eye..."].map((text) => (
          <Word
            key={text}
            word={{ text }}
            index={wordIndex++}
            progress={progress}
          />
        ))}
      </motion.div>
      <motion.div
        layout
        className={`text-foreground/70 flex justify-center ${converged ? "gap-0" : "gap-2"}`}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {["Venture", "in."].map((text) => (
          <Word
            key={text}
            word={{ text, double: true }}
            index={wordIndex++}
            progress={progress}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default StaggerReveal;
