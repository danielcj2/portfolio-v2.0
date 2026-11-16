"use client";

import Card from "@/ui/Card";
import Image from "next/image";
import Logo from "@/images/logo.svg";

import { motion } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

type TextState = "first" | "second" | "third";

const shuffle = {
  first: { x: "0%", y: "0%" },
  second: { x: "0%", y: "-50%" },
  third: { x: "-50%", y: "-50%" },
} as const;

const TRANSITION = { duration: 1, ease: [0.65, 0, 0.35, 1] as const };
const PAUSE_DURATION = 3000; // time to read
const r2Url = process.env.NEXT_PUBLIC_BENTO;

const MainShuffle = () => {
  const [stage, setStage] = useState<TextState>("first");
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleHoverStart = useCallback(() => {
    clearTimer();
    setIsHovered(true);
    setStage("first");
  }, [clearTimer]);

  const handleHoverEnd = useCallback(() => {
    clearTimer();
    setIsHovered(false);
    setStage("first");
  }, [clearTimer]);

  useEffect(() => {
    if (!isHovered) {
      clearTimer();
      return;
    }

    timerRef.current = setTimeout(() => setStage("second"), PAUSE_DURATION);
    return clearTimer;
  }, [isHovered, clearTimer]);

  useEffect(() => {
    if (!isHovered || stage === "first") return; // won't repeat animation until rehovering after reset

    const next: Record<TextState, TextState> = {
      first: "second",
      second: "third",
      third: "first",
    };

    timerRef.current = setTimeout(() => setStage(next[stage]), PAUSE_DURATION);

    return clearTimer;
  }, [stage, isHovered, clearTimer]);

  return (
    <Card
      className="col-span-6 row-span-8 overflow-hidden"
      animate={stage}
      initial={{ color: "rgba(38, 39, 48, 0.75)" }}
      variants={{
        first: { backgroundColor: "rgba(38, 39, 48, 0.75)" },
        second: { backgroundColor: "rgba(71, 66, 87, 0.75)" },
        third: { backgroundColor: "rgba(70, 91, 62, 0.75)" },
      }}
      transition={TRANSITION}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.div
        aria-hidden="true"
        className="-gap-10 -top-10 flex w-min flex-col"
        animate={stage}
        initial={{ color: "rgba(38, 39, 48, 1)" }}
        variants={{
          first: { color: "rgba(38, 39, 48, 1)" },
          second: { color: "rgba(71, 66, 87, 1)" },
          third: { color: "rgba(70, 91, 62, 1)" },
        }}
        transition={TRANSITION}
      >
        {[...Array(10)].map((_, i) => (
          <Logo key={i} className="h-16 w-auto rotate-90" />
        ))}
      </motion.div>
      <div className="center-xy h-auto w-[70%]">
        <motion.div
          className="shadow-background-v2/50 relative h-full w-full shadow-xl"
          animate={{ scale: isHovered ? 0.9 : 1 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          <Image
            src={`${r2Url}/dashboard.png`}
            alt="Dashboard"
            width={1250}
            height={937}
            className="h-auto w-full"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            sizes="(min-width: 1536px) 35vw, (min-width: 1280px) 42vw, 46vw"
          />
        </motion.div>
      </div>
      <div className="center-xy aspect-1000/700 h-auto w-[75%]">
        <motion.div
          aria-hidden="true"
          className="relative h-full w-full origin-[80%_20%]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0.65, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="shadow-background-v2/50 relative z-0 h-full w-full overflow-hidden rounded-3xl shadow-xl">
            <motion.div
              className="absolute top-0 left-0 h-[200%] w-[200%]"
              animate={stage}
              variants={shuffle}
              transition={TRANSITION}
            >
              <Image
                src={`${r2Url}/bento.png`}
                alt="Shuffle Atlas"
                width={2000}
                height={1400}
                className="h-full w-full"
                decoding="async"
                sizes="(min-width: 1536px) 75vw, 90vw"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default MainShuffle;
