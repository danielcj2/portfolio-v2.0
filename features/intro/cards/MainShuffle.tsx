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

const TRANSITION = { duration: 1.5, ease: [0.65, 0, 0.35, 1] as const };
const PAUSE_DURATION = 3000; // time to read
const r2Url = process.env.NEXT_PUBLIC_QUICKQR;

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
          className="relative h-full w-full"
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
            sizes="(max-width: 768px) 100vw, 35vw"
          />
          <div className="bg-foreground/30 absolute -inset-1.25 -z-1 w-auto rounded-xl" />
        </motion.div>
      </div>
      <div className="center-xy aspect-1000/700 h-auto w-[75%]">
        <motion.div
          aria-hidden="true"
          className="relative h-full w-full origin-[80%_20%] will-change-transform"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0.65, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute -inset-1.5 -z-1 w-auto rounded-[30px] bg-[#f2f3f0]" />
          <div className="relative z-0 h-full w-full overflow-hidden rounded-3xl shadow-[0px_0px_10px_rgba(0,0,0,0.75)]">
            <motion.div
              className="absolute top-0 left-0 h-[200%] w-[200%] will-change-transform"
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
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 70vw"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default MainShuffle;
