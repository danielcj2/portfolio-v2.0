"use client";

import { motion, useReducedMotion, Variants } from "motion/react";

const dotVariants: Variants = {
  fade: {
    opacity: [0.4, 1, 1, 1, 0.4],
    transition: {
      duration: 1.6,
      repeat: Infinity,
      repeatDelay: 0.4,
      ease: "easeInOut",
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
          className="h-1.5 w-1.5 rounded-full bg-white"
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );
};

export default TypingIndicator;
