"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useTextScramble } from "./useTextScramble";

type TextScrambleProps = {
  text: string;
  className?: string;
  children?: ReactNode;
};

const TextScramble = ({ text, className, children }: TextScrambleProps) => {
  const { displayText, scramble } = useTextScramble(text);

  return (
    <motion.div
      className={cn("inline-flex items-center", className)}
      onHoverStart={scramble}
      onFocus={scramble}
    >
      <div className="relative">
        <span className="invisible whitespace-pre" aria-hidden="true">
          {text}
        </span>
        <span className="absolute inset-0 whitespace-pre" aria-hidden="true">
          {displayText}
        </span>
        <span className="sr-only">{text}</span>
      </div>
      {children}
    </motion.div>
  );
};

export default TextScramble;
