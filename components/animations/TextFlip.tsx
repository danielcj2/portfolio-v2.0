"use client";

import { motion, useReducedMotion } from "motion/react";

const TextFlip = ({ children }: { children: string }) => {
  const DURATION: number = 0.275;
  const STAGGER: number = 0.0275;
  const reduceMotion = useReducedMotion();
  const letters = Array.from(children);

  const transitionForIndex = (i: number) => ({
    duration: DURATION,
    ease: "easeInOut" as const,
    delay: i * STAGGER,
  });

  const renderLine = (
    initialY: string | number,
    hoveredY: string | number,
    keyPrefix: string,
  ) =>
    letters.map((letter, i) => (
      <motion.span
        className="inline-block"
        variants={{
          initial: { y: initialY },
          hovered: { y: reduceMotion ? initialY : hoveredY },
        }}
        transition={transitionForIndex(i)}
        key={`${keyPrefix}-${i}-${letter}`}
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ));

  return (
    <motion.div
      className="relative block overflow-hidden whitespace-nowrap"
      initial="initial"
      whileHover={reduceMotion ? undefined : "hovered"}
    >
      <p className="cursor-inherit">{renderLine(0, "-100%", "top")}</p>
      <p className="cursor-inherit absolute inset-0">
        {renderLine("100%", 0, "bottom")}
      </p>
    </motion.div>
  );
};

export default TextFlip;
