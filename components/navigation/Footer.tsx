"use client";

import Logo from "@/images/logo.svg";

import { motion } from "motion/react";
import { useState } from "react";
import { useTextScramble } from "../animations/useTextScramble";

const text1 = "curiosity and love";
const text2 = "caffeine and headaches";

const Footer = () => {
  const [isScrambleVisible, setIsScrambleVisible] = useState(false);
  const { displayText, scrambleTo } = useTextScramble(text2);

  return (
    <footer
      id="footer"
      className="pointer-events-none relative z-52 flex h-0 items-end"
    >
      <div className="grid-12 relative w-full px-3.5 py-3 md:px-4">
        <motion.div
          className="text-foreground/50 pointer-events-auto col-span-6 col-start-1 w-max font-mono text-[0.8125rem] leading-snug tracking-[0.015em] uppercase md:text-[15px]"
          onHoverStart={() => {
            setIsScrambleVisible(true);
            scrambleTo(text2);
          }}
          onHoverEnd={() => {
            scrambleTo(text1, () => setIsScrambleVisible(false));
          }}
        >
          <p className="flex gap-0.75 md:leading-tight">
            <Logo className="text-muted/60 mb-1 hidden h-auto w-4 rotate-25 stroke-2 md:block" />
            <span>site by me</span>
          </p>
          <p className="md:hidden">all rights reserved</p>
          <p className="hidden md:block">made with</p>
          <p className="relative hidden md:block">
            {text1}
            <motion.span
              aria-hidden="true"
              className="bg-background-v2 absolute inset-y-0 left-0 w-full whitespace-nowrap"
              initial={false}
              animate={{ opacity: isScrambleVisible ? 1 : 0 }}
              transition={{ duration: 0 }}
            >
              {displayText}
            </motion.span>
          </p>
        </motion.div>
        <div className="col-span-6 col-end-13 self-end pb-0.5 md:pb-0">
          <p className="text-muted/80 pointer-events-auto text-end text-xl leading-[0.95] font-medium md:text-2xl">
            @2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
