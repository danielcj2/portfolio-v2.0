"use client";

import { motion } from "motion/react";
import { useLenisScroll } from "@/providers/LenisContext";
import { useTextScramble } from "@/animations/useTextScramble";

const CueButton = () => {
  const { scrollTo } = useLenisScroll();
  const { displayText: scrambledText, scramble } = useTextScramble("About me");

  return (
    <motion.button
      className="relative z-0 h-14 w-full cursor-pointer"
      initial="initial"
      whileHover="hover"
      whileFocus="hover"
      onHoverStart={scramble}
      onFocus={scramble}
      onClick={() => scrollTo("#about")}
    >
      <span className="sr-only">Learn more about me</span>
      <motion.div
        aria-hidden="true"
        className="border-muted/18 absolute top-1/2 left-1/2 z-10 h-full -translate-1/2 cursor-pointer overflow-hidden border text-[21px] leading-snug font-medium"
        variants={{
          initial: { width: "100%", borderRadius: 18 },
          hover: {
            width: "90%",
            borderRadius: 0,
            transition: { duration: 0.25, ease: "easeInOut" },
          },
        }}
      >
        <div className="text-muted bg-muted/4 flex h-full items-center justify-center">
          <div className="flex items-baseline">
            <p>Learn more</p>
            <span className="bg-muted ml-0.5 size-0.75 shrink-0" />
            <span className="bg-muted ml-0.5 size-0.75 shrink-0" />
            <span className="bg-muted ml-0.5 size-0.75 shrink-0" />
          </div>
        </div>
        <motion.div
          className="text-background bg-muted absolute inset-0 z-10 flex items-center justify-center"
          transition={{
            duration: 1.25,
            ease: [0.01, 1, 0.15, 1],
          }}
          variants={{
            initial: {
              clipPath: "inset(0% 100% 0% 0%)",
            },
            hover: {
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: 0 },
            },
          }}
        >
          {scrambledText}
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default CueButton;
