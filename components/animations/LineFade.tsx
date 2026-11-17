"use client";

import {
  motion,
  TargetAndTransition,
  useReducedMotion,
  useInView,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

type LineFadeProps = {
  className?: string;
  direction?: "horizontal" | "vertical";
  duration?: number;
  count?: number;
};

const configs = {
  horizontal: {
    container: "right-0 left-0 h-px",
    line: "h-full w-25 bg-linear-to-r",
    initial: { left: "-100%" },
    animate: { left: ["-100%", "100%"] } as TargetAndTransition,
  },
  vertical: {
    container: "top-0 bottom-0 w-px h-full",
    line: "w-full h-25 bg-linear-to-b",
    initial: { top: "-100%" },
    animate: { top: ["-100%", "100%"] } as TargetAndTransition,
  },
} as const;

const LineFade = ({
  className,
  direction = "horizontal",
  duration = 1.75,
  count = 1,
}: LineFadeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const reduceMotion = useReducedMotion();
  const { container, line, initial, animate } = configs[direction];
  const STAGGER = 0.75;

  const easeOutQuad = (t: number) => t * (2 - t);

  return (
    <div className="contents">
      {Array.from({ length: count }).map((_, i) => {
        const delay =
          easeOutQuad(i / Math.max(1, count - 1)) * (STAGGER * count);

        return (
          <div
            key={i}
            ref={i === 0 ? ref : undefined}
            className={cn(
              "pointer-events-none relative bg-[rgba(255,255,255,0.04)]",
              container,
              className,
            )}
            aria-hidden="true"
            role="presentation"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className={`via-muted/50 absolute ${line} from-transparent to-transparent`}
                initial={initial}
                animate={reduceMotion || !isInView ? initial : animate}
                transition={{
                  duration,
                  delay,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 4,
                }}
                aria-hidden
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LineFade;
