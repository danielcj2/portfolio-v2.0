"use client";

import { motion, useMotionValue, useTransform, useAnimate } from "motion/react";
import { useEffect, useState } from "react";

const MIN_ANIMATION_MS = 2400;
const EXIT_MS = 1200;

type SitePreloaderProps = {
  onComplete: () => void;
};

const SitePreloader = ({ onComplete }: SitePreloaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [scope, animate] = useAnimate();
  const count = useMotionValue(0);
  const displayCount = useTransform(count, (val) =>
    String(Math.round(val)).padStart(2, "0"),
  );

  useEffect(() => {
    let cancelled = false;
    let finishTimer: ReturnType<typeof setTimeout> | null = null;

    const run = async () => {
      if (!cancelled) {
        await animate(count, 99, {
          duration: MIN_ANIMATION_MS / 1000,
          ease: "linear",
        });
      }

      if (!cancelled) {
        setIsExiting(true);
        finishTimer = setTimeout(() => {
          if (!cancelled) onComplete();
        }, EXIT_MS);
      }
    };

    run();

    return () => {
      cancelled = true;
      if (finishTimer) {
        clearTimeout(finishTimer);
      }
    };
  }, [onComplete, count, animate]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-120 hidden md:block"
      ref={scope}
    >
      <motion.div
        className="absolute top-1/2 left-1/2"
        initial={false}
        animate={
          isExiting
            ? {
                width: [0, "24vw", "100vw"],
                height: [0, "2px", "100vh"],
              }
            : { width: 0, height: 0 }
        }
        transition={{
          duration: EXIT_MS / 1000,
          ease: "easeInOut",
          times: [0, 0.32, 1],
          delay: 0.1,
        }}
        style={{
          backgroundColor: "transparent",
          boxShadow: "0 0 0 9999px var(--background-v2)",
          borderRadius: "48px",
          transform: "translate(-50%, -50%)",
        }}
      ></motion.div>
      <div className="center-xy">
        <motion.div
          className="font-chakra w-[2ch] text-4xl font-medium tabular-nums"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ color: "var(--foreground)" }}
        >
          <motion.span>{displayCount}</motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default SitePreloader;
