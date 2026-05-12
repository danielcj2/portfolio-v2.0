"use client";

import Card from "@/ui/Card";
import Image from "next/image";
import Logo from "@/images/logo.svg";

import { motion, type Variants } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

// TODO - Refactor variants
//      - 9x9 grid, where odd numbers are slides, evens are bentos
//      - Move by 2 cells per stage in one direction

type TextState = "first" | "second" | "third" | "fourth";
type ShuffleLayer = {
  src: Parameters<typeof Image>[0]["src"];
  alt: string;
  className: string;
  variants: Variants;
};

const TRANSITION = { duration: 1.5, ease: [0.65, 0, 0.35, 1] as const };
const PAUSE_DURATION = 3500; // time to read
const r2Url = process.env.NEXT_PUBLIC_QUICKQR;

const shuffleLayers: ShuffleLayer[] = [
  {
    src: `${r2Url}/slide1.png`,
    alt: "Slide 1",
    className: "absolute inset-0 z-1",
    variants: {
      first: { y: "0%", x: "0%" },
      second: { y: "-200%", x: "0%" },
      third: { y: "-200%", x: "-200%" },
      fourth: { y: "0%", x: "-200%" },
    },
  },
  {
    src: `${r2Url}/bento1.png`,
    alt: "Bento 1",
    className: "absolute inset-0 z-1",
    variants: {
      first: { y: "100%", x: "0%" },
      second: { y: "-100%", x: "0%" },
      third: { y: "-100%", x: "-200%" },
      fourth: { y: "100%", x: "-200%" },
    },
  },
  {
    src: `${r2Url}/slide2.png`,
    alt: "Slide 2",
    className: "absolute inset-0",
    variants: {
      first: { y: "200%", x: "0%" },
      second: { y: "0%", x: "0%" },
      third: { y: "0%", x: "-200%" },
      fourth: { y: "200%", x: "-200%" },
    },
  },
  {
    src: `${r2Url}/bento2.png`,
    alt: "Bento 2",
    className: "absolute inset-0",
    variants: {
      first: { y: "200%", x: "100%" },
      second: { y: "0%", x: "100%" },
      third: { y: "0%", x: "-100%" },
      fourth: { y: "200%", x: "-100%" },
    },
  },
  {
    src: `${r2Url}/slide3.png`,
    alt: "Slide 3",
    className: "absolute inset-0",
    variants: {
      first: { y: "200%", x: "200%" },
      second: { y: "0%", x: "200%" },
      third: { y: "0%", x: "0%" },
      fourth: { y: "200%", x: "0%" },
    },
  },
  {
    src: `${r2Url}/bento3.png`,
    alt: "Bento 3",
    className: "absolute inset-0",
    variants: {
      first: { y: "100%", x: "200%" },
      second: { y: "-100%", x: "200%" },
      third: { y: "-100%", x: "0%" },
      fourth: { y: "100%", x: "0%" },
    },
  },
  {
    src: `${r2Url}/slide4.png`,
    alt: "Slide 4",
    className: "absolute inset-0",
    variants: {
      first: { y: "0%", x: "200%" },
      second: { y: "-200%", x: "200%" },
      third: { y: "-200%", x: "0%" },
      fourth: { y: "0%", x: "0%" },
    },
  },
  {
    src: `${r2Url}/bento4.png`,
    alt: "Bento 4",
    className: "absolute inset-0",
    variants: {
      first: { y: "0%", x: "100%" },
      second: { y: "-200%", x: "100%" },
      third: { y: "-200%", x: "-100%" },
      fourth: { y: "0%", x: "-100%" },
    },
  },
];

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

  useEffect(() => {
    if (!isHovered) {
      clearTimer();
      setStage("first");
      return;
    }

    setStage("first");
    timerRef.current = setTimeout(() => setStage("second"), PAUSE_DURATION);
    return clearTimer;
  }, [isHovered, clearTimer]);

  useEffect(() => {
    if (!isHovered || stage === "first") return; // won't repeat animation until rehovering after reset

    const next: Record<TextState, TextState> = {
      first: "second",
      second: "third",
      third: "fourth",
      fourth: "first",
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
        fourth: { backgroundColor: "rgba(54, 61, 74, 0.75)" },
      }}
      transition={TRANSITION}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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
          fourth: { color: "rgba(54, 61, 74, 1)" },
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
      <div className="center-xy aspect-1440/1080 h-auto w-[70%]">
        <motion.div
          aria-hidden="true"
          className="relative h-full w-full origin-[80%_20%] will-change-transform"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0.65, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute -inset-1.5 -z-1 w-auto rounded-[30px] bg-[#f2f3f0]" />
          <div className="relative z-0 h-full w-full overflow-hidden rounded-3xl shadow-[0px_0px_10px_rgba(0,0,0,0.75)]">
            {shuffleLayers.map(({ src, alt, className, variants }) => (
              <motion.div
                key={alt}
                className={className}
                animate={stage}
                variants={variants}
                transition={TRANSITION}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={900}
                  height={675}
                  className="h-auto w-full"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default MainShuffle;
