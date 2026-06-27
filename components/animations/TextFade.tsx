"use client";

import { motion } from "motion/react";

const INITIAL = "var(--color-muted-v2)";
const TO = "var(--color-foreground)";

const TextFade = ({ children }: { children: string }) => {
  return (
    <motion.span
      className="inline-block indent-0 text-nowrap [text-box:trim-both_ex_alphabetic]"
      initial={{ color: INITIAL }}
      whileInView={{ color: TO }}
      viewport={{ margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
};

export default TextFade;
