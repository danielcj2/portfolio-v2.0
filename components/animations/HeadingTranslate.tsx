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

  const offset = isMobile ? 80 : 200;

  const ratio = useTransform(scrollYProgress, [0, 0.3], [offset, 0]);
  const spring = useSpring(ratio, { stiffness: 200, damping: 100 });
  const x = useTransform(spring, (v) => `${direction === "left" ? -v : v}px`);

  return (
    <motion.div
      ref={target}
      className="backface-hidden"
      style={reduceMotion ? style : { ...style, x }}
      {...restProps}
    >
      <p className="leading-[100%]">{text}</p>
    </motion.div>
  );
};

export default HeadingTranslate;
