"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/providers/MediaQueryContext";
import {
  HTMLMotionProps,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

type HeadingProps = {
  text: string;
  direction: "left" | "right";
} & HTMLMotionProps<"div">;

const HeadingTranslate = ({ text, direction, ...props }: HeadingProps) => {
  const { style, ...restProps } = props;
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { isMobile } = useMediaQuery();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end center"],
  });

  const offset = isMobile ? 80 : 160;

  const x = useTransform(
    scrollYProgress,
    [0, 0.3],
    [direction === "left" ? -offset : offset, 0],
  );
  const spring = useSpring(x, { stiffness: 200, damping: 100 });

  return (
    <motion.div
      className="will-change-transform"
      ref={target}
      style={
        reduceMotion
          ? style
          : {
              ...style,
              x: spring,
              z: 0,
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
            }
      }
      {...restProps}
    >
      <div className="overflow-visible">
        <p
          className={cn(
            "leading-[100%]",
            direction === "right" && "pr-[0.15em] outline outline-transparent",
          )}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default HeadingTranslate;
