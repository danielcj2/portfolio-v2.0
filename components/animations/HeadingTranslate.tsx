"use client";

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
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({
    container,
    target,
    offset: ["start end", "end center"],
  });

  const ratio = useTransform(scrollYProgress, [0, 0.3], [15, 0]);
  const spring = useSpring(ratio, { stiffness: 200, damping: 100 });
  const x = useTransform(spring, (v) => `${direction === "left" ? -v : v}%`);

  return (
    <motion.div
      ref={target}
      className="will-change-transform backface-hidden"
      style={reduceMotion ? style : { ...style, x }}
      {...restProps}
    >
      <p className="leading-[100%]">{text}</p>
    </motion.div>
  );
};

export default HeadingTranslate;
