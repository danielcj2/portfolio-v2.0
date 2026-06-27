"use client";

import { useMediaQuery } from "@/providers/MediaQueryContext";
import { useScrollContainer } from "@/providers/ScrollContext";
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
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({
    container,
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
      ref={target}
      style={reduceMotion ? style : { ...style, x: spring }}
      {...restProps}
    >
      <div className="overflow-visible pr-[0.15em]">
        <p className="leading-[100%]">{text}</p>
      </div>
    </motion.div>
  );
};

export default HeadingTranslate;
