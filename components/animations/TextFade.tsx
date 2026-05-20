"use client";

import { useScrollContainer } from "@/providers/ScrollContext";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";

const INITIAL = "var(--color-muted-v2)";
const TO = "var(--color-foreground)";

const TextFade = ({ children }: { children: string }) => {
  const target = useRef<HTMLSpanElement>(null);
  const [animate, setAnimate] = useState(false);
  const animateRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const container = useScrollContainer();

  const { scrollYProgress } = useScroll({
    container,
    target,
    offset: ["start end", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = !reduceMotion && latest > 0.5;
    if (next === animateRef.current) return;
    animateRef.current = next;
    setAnimate(next);
  });

  return (
    <motion.span
      ref={target}
      className="inline-block indent-0 text-nowrap [text-box:trim-both_ex_alphabetic]"
      initial={{ color: INITIAL }}
      animate={{ color: animate ? TO : INITIAL }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
};

export default TextFade;
