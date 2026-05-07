"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { HTMLMotionProps, motion } from "motion/react";

// CHANGE TO DEFAULT / DOUBLE BORDER VARIANT LATER
type CardProps = HTMLMotionProps<"div"> & {
  theme?: "default" | "light" | "stacked" | "button";
};

const Card = ({ className, theme, children, ...props }: CardProps) => {
  return (
    <motion.div className={cn(variants({ theme }), className)} {...props}>
      {children}
    </motion.div>
  );
};

const variants = cva("relative h-full w-full", {
  variants: {
    theme: {
      default: "border border-neutral-900 bg-neutral-900 rounded-4xl",
      stacked:
        "border border-foreground/5 bg-neutral-900 p-2 gap-2.5 flex flex-col rounded-3xl",
      light:
        "border border-foreground/6 bg-foreground/3 rounded-2xl h-auto overflow-hidden",
      button:
        "border border-foreground/6 bg-foreground/3 rounded-2xl h-auto overflow-hidden cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-foreground/4 active:bg-foreground/8 text-muted hover:text-foreground",
    },
  },
  defaultVariants: {
    theme: "default",
  },
});

export default Card;
