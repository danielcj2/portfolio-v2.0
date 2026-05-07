"use client";

import { motion, useReducedMotion, Variants } from "motion/react";

const dotVariants: Variants = {
  fade: {
    backgroundColor: "var(--color-foreground)",
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.6,
    },
  },
};

const TypingIndicator = () => {
  const reduceMotion = !!useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? undefined : "fade"}
      transition={{ staggerChildren: 0.3 }}
      className="flex gap-0.75"
      aria-hidden="true"
      role="presentation"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-muted-v2 h-1.5 w-1.5 rounded-full"
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );
};

export default TypingIndicator;
