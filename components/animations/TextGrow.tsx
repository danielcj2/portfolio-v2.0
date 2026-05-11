"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { useScrollContainer } from "@/providers/ScrollContext";
import { cn } from "@/lib/utils";

type TextGrowProps = { text: string; className?: string };
type BoxProps = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  reduceMotion: boolean;
};

const START = 0.2;
const DURATION = 0.3;

const Box = ({ children, progress, reduceMotion }: BoxProps) => {
  const END = START + DURATION;
  // NOTE: Keeping fixed width growth for now; revisit responsive range mapping if needed.
  const widthRaw = useTransform(progress, [START, END], [20, 200]);
  const opacity = useTransform(progress, [START, END], [0.25, 1]);
  const width = useSpring(widthRaw, { stiffness: 250, damping: 30 });
  const fade = useTransform(progress, [END, END + DURATION], [0, 1]);

  return (
    <motion.div
      className="relative max-w-full overflow-hidden"
      style={{
        opacity: reduceMotion ? 1 : opacity,
        width: reduceMotion ? 200 : width,
      }}
    >
      <motion.span
        className="bg-muted absolute inset-0 -z-1"
        aria-hidden="true"
        role="presentation"
      />
      <motion.p className="p-1" style={{ opacity: reduceMotion ? 1 : fade }}>
        {children}
      </motion.p>
    </motion.div>
  );
};

const TextGrow = ({ text, className }: TextGrowProps) => {
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();
  const container = useScrollContainer();

  const { scrollYProgress: progress } = useScroll({
    target,
    container,
    offset: ["start end", "end center"],
  });

  return (
    <motion.div
      ref={target}
      layout="size"
      className={cn("text-background", className)}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Box progress={progress} reduceMotion={reduceMotion}>
        {text}
      </Box>
    </motion.div>
  );
};

export default TextGrow;
