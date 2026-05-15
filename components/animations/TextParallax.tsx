"use client";

import React, { useLayoutEffect, useRef } from "react";
import Logo from "@/images/logo.svg";

import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useScrollContainer } from "@/providers/ScrollContext";

type ParallaxProps = {
  className?: string;
  items: string[];
  options?: {
    baseVelocity?: number;
    fadeSides?: boolean;
    direction?: "left" | "right";
    changeDirection?: boolean;
    gap?: number;
    Divider?: React.ComponentType<{ className?: string }>;
    dividerClassName?: string;
  };
};

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

const SIDE_FADE_MASK =
  "mask-[linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,rgba(0,0,0,0))]";

const TextParallax = ({ className, items, options }: ParallaxProps) => {
  const {
    baseVelocity = 100,
    fadeSides = true,
    direction = "right",
    changeDirection = true,
    gap = 12,
    Divider = Logo,
    dividerClassName = "text-muted-v2 h-6 w-6 stroke-2",
  } = options || {};

  const containerRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef<number>(0);
  const baseX = useMotionValue(0);
  const directionFactor = useRef<number>(direction === "right" ? 1 : -1);
  const reduceMotion = !!useReducedMotion();
  const scrollContainer = useScrollContainer();
  const isInView = useInView(containerRef, {
    amount: 0.2,
    root: scrollContainer,
  });

  // NOTE: Cache track width so the transform calculation avoids per-frame layout reads.
  useLayoutEffect(() => {
    if (items.length === 0) return;
    const el = containerRef.current;
    if (!el) return;

    const updateLoopWidth = () => {
      const contentWidth = el.scrollWidth / 2;
      loopWidthRef.current = contentWidth + gap;
    };

    updateLoopWidth();

    const observer = new ResizeObserver(updateLoopWidth);
    observer.observe(el);

    return () => observer.disconnect();
  }, [gap, items]);

  const container = useScrollContainer();
  const { scrollY } = useScroll({ container });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // NOTE: X Position Calculation
  // Loops the content horizontally infinitely
  const x: MotionValue<string> = useTransform(baseX, (v) => {
    if (loopWidthRef.current <= 0) return "0px";
    return `${wrap(-loopWidthRef.current, 0, v)}px`;
  });

  // NOTE: Update baseX based on scroll direction and velocity
  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    if (!isInView) return;
    if (!containerRef.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();

    if (changeDirection) {
      if (vf < 0) directionFactor.current = -1;
      if (vf > 0) directionFactor.current = 1;
      moveBy += directionFactor.current * moveBy * vf;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={cn(
        "font-chakra text-muted-v2 relative h-full w-full overflow-hidden text-3xl font-extrabold italic",
        fadeSides && SIDE_FADE_MASK,
        className,
      )}
    >
      <motion.div
        className="absolute flex h-full flex-nowrap items-center whitespace-nowrap"
        ref={containerRef}
        style={{ x, gap: `${gap * 2}px` }}
      >
        {[...items, ...items].map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            <span>{item}</span>
            {Divider && <Divider className={cn("inline", dividerClassName)} />}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default TextParallax;
