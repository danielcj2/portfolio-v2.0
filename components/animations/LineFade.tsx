"use client";

import { motion, TargetAndTransition, useReducedMotion } from "motion/react";

type LineFadeProps = {
  direction?: "horizontal" | "vertical";
  duration?: number;
  count?: number;
  hasBadge?: "none" | "start" | "end" | "both";
};

const configs = {
  horizontal: {
    container: "right-0 left-0 h-px",
    line: "h-full w-25 bg-linear-to-r",
    initial: { left: "-100%" },
    animate: { left: ["-100%", "100%"] } as TargetAndTransition,
    badge: {
      start: "left-0 top-0 -translate-y-1/2",
      end: "right-0 top-0 -translate-y-1/2",
    },
  },
  vertical: {
    container: "top-0 bottom-0 w-px h-full",
    line: "w-full h-25 bg-linear-to-b",
    initial: { top: "-100%" },
    animate: { top: ["-100%", "100%"] } as TargetAndTransition,
    badge: {
      start: "top-0 left-0 -translate-x-1/2",
      end: "bottom-0 left-0 -translate-x-1/2",
    },
  },
} as const;

const LineFade = ({
  direction = "horizontal",
  duration = 1.75,
  count = 1,
  hasBadge = "none",
}: LineFadeProps) => {
  const reduceMotion = useReducedMotion();
  const { container, line, initial, animate, badge } = configs[direction];
  const STAGGER = 0.75;

  const easeOutQuad = (t: number) => t * (2 - t);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const delay =
          easeOutQuad(i / Math.max(1, count - 1)) * (STAGGER * count);
        return (
          <div
            key={i}
            className={`relative ${container} pointer-events-none bg-[rgba(255,255,255,0.04)]`}
            aria-hidden="true"
            role="presentation"
          >
            {hasBadge === "start" || hasBadge === "both" ? (
              <span className={`bg-muted-v2 absolute ${badge.start} h-1 w-1`} />
            ) : null}
            {hasBadge === "end" || hasBadge === "both" ? (
              <span className={`bg-muted-v2 absolute ${badge.end} h-1 w-1`} />
            ) : null}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className={`via-muted/40 absolute ${line} from-transparent to-transparent`}
                initial={initial}
                animate={reduceMotion ? undefined : animate}
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
    </>
  );
};

export default LineFade;
