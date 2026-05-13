"use client";

import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useState } from "react";

type WordProps = {
  word: { text: string; className: string; double?: boolean };
  index: number;
  progress: MotionValue<number>;
};

const STAGGER = 0.02;
const DURATION = 0.05;
const CONVERGE_START = STAGGER * 5 + DURATION; // stagger * index + duration = 0.15
const CONVERGE_END = CONVERGE_START + 0.15; // 0.3

const Word = ({ word, index, progress }: WordProps) => {
  const max = word?.double ? 25 : 10;

  const opacity = useTransform(
    progress,
    [STAGGER * index, STAGGER * index + DURATION],
    [0, 1],
  );

  const maxWidth = useTransform(
    progress,
    [CONVERGE_START, CONVERGE_END],
    [200, max],
  );

  const fade = useTransform(
    progress,
    [CONVERGE_START, CONVERGE_END],
    [1, 0.05],
  );

  return (
    <motion.p
      layout
      className="relative cursor-text overflow-hidden"
      style={{ maxWidth, opacity: fade }}
    >
      <motion.span
        className={`${word.className} absolute inset-0`}
        style={{ opacity }}
      />
      {word.text}
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
    <div className="-z-2 col-span-6 row-start-2 mb-6 self-center text-[32px] leading-none font-medium tracking-tighter">
      <motion.div
        layout
        className={`text-muted-v2 flex justify-center ${converged ? "mb-0 gap-0" : "mb-2 gap-2"}`}
      >
        {["More", "than", "meets", "the", "eye..."].map((text) => (
          <Word
            key={text}
            word={{ text, className: "bg-muted-v2" }}
            index={wordIndex++}
            progress={progress}
          />
        ))}
      </motion.div>
      <motion.div
        layout
        className={`text-muted flex justify-center ${converged ? "gap-0" : "gap-2"}`}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {["Venture", "in."].map((text) => (
          <Word
            key={text}
            word={{ text, className: "bg-muted", double: true }}
            index={wordIndex++}
            progress={progress}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default StaggerReveal;
