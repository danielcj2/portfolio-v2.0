"use client";

import { useScrollContainer } from "@/providers/ScrollContext";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

type HeadingProps = { text: string };

const HeadingFade = ({ text }: HeadingProps) => {
  const target = useRef<HTMLDivElement>(null);
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({
    container,
    target,
    offset: ["start end", "end start"],
  });

  const ratio = useTransform(scrollYProgress, [0, 0.6], [30, 52]);
  const spring = useSpring(ratio, { stiffness: 300, damping: 100 });
  const yNeg = useTransform(spring, (v) => `${-v}%`);

  return (
    <div
      className="relative hidden w-full md:block"
      aria-hidden="true"
      role="presentation"
      ref={target}
    >
      <motion.div
        className="absolute top-0 -z-1 -translate-x-1/3 tracking-widest"
        style={{ y: yNeg }}
      >
        <span className="to-muted/20 bg-linear-to-t from-transparent from-30% bg-clip-text font-mono text-[112px] font-semibold tracking-tighter text-transparent xl:text-[146px]">
          {text}
        </span>
      </motion.div>
    </div>
  );
};

export default HeadingFade;
