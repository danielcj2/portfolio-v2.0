"use client";

import { cn } from "@/lib/utils";
import { useScrollContainer } from "@/providers/ScrollContext";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";

type RowFadeProps = {
  className?: string;
  color?: string;
  count?: number;
  offset?: number;
  progress?: MotionValue<number>;
};

const ROW_DELAY_STEP = 0.08;
const ROW_REVEAL_DURATION = 0.4;

const Row = ({
  color,
  scrollYProgress,
  delay,
}: {
  color?: string;
  scrollYProgress: MotionValue<number>;
  delay: number;
}) => {
  const clipPath = useTransform(
    scrollYProgress,
    [delay, Math.min(delay + ROW_REVEAL_DURATION, 1)],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );
  return (
    <motion.div
      style={{ clipPath }}
      className={`bg-${color} h-[calc(100%+1px)]`}
    />
  );
};

const RowFade = ({
  className,
  color = "muted",
  count = 6,
  offset = 0,
  progress,
}: RowFadeProps) => {
  const target = useRef<HTMLDivElement>(null);
  const container = useScrollContainer();
  const { scrollYProgress: targetProgress } = useScroll({
    target,
    container,
    offset: ["end end", "end center"],
  });
  const animationProgress = progress ?? targetProgress;

  return (
    <div
      ref={target}
      className={cn(
        "pointer-events-none absolute bottom-0 left-0 grid h-screen w-screen",
        `grid-rows-[repeat(${count},minmax(0,1fr))]`,
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Row
          key={index}
          scrollYProgress={animationProgress}
          color={color}
          delay={offset + (count - index - 1) * ROW_DELAY_STEP}
        />
      ))}
    </div>
  );
};

export default RowFade;
