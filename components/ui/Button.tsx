"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { HTMLMotionProps, motion } from "motion/react";

type ButtonProps = (HTMLMotionProps<"button"> & HTMLMotionProps<"a">) & {
  as?: "button" | "a";
  aspect?: "square" | "wide";
};

const SHADOW_INITIAL =
  "inset -6px -6px 10px #646464, inset 4px 4px 8px #c6c6c6";
const SHADOW_FOCUSED =
  "inset 5px 5px 10px #646464, inset -5px -5px 10px #c6c6c6";

const Button = ({ as = "button", className, aspect, children, ...props }: ButtonProps) => {
  const sharedProps = {
    className: cn(variants({ aspect }), className),
    initial: { boxShadow: SHADOW_INITIAL },
    whileFocus: { boxShadow: SHADOW_FOCUSED },
    whileTap: { boxShadow: SHADOW_FOCUSED },
    transition: { duration: 0.2, ease: "easeOut" as const },
  };

  if (as === "a") {
    return (
      <motion.a
        {...sharedProps}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      {...sharedProps}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const variants = cva(
  "bg-muted border-background-v2 border-px text-nowrap relative flex h-full cursor-pointer items-center overflow-hidden rounded-lg outline-none",
  {
    variants: {
      aspect: {
        square: "w-auto aspect-square justify-center px-0",
        wide: "w-min px-10",
      },
    },
    defaultVariants: {
      aspect: "wide",
    },
  },
);

export default Button;
