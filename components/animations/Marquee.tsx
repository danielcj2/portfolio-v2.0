"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";

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
  children: React.ReactNode;
  options?: {
    baseVelocity?: number;
    fadeSides?: boolean;
    direction?: "left" | "right";
    changeDirection?: boolean;
    scrollBoost?: boolean;
    gap?: number;
  };
};

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

const SIDE_FADE_MASK =
  "mask-[linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,rgba(0,0,0,0))]";
const REFERENCE_WIDTH = 320;

const Marquee = ({ className, children, options }: ParallaxProps) => {
  const {
    baseVelocity = 100,
    fadeSides = true,
    direction = "right",
    changeDirection = true,
    scrollBoost = true,
    gap = 12,
  } = options || {};

  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef<number>(0);
  const viewportWidthRef = useRef<number>(0);
  const baseX = useMotionValue(0);
  const directionFactor = useRef<number>(direction === "right" ? 1 : -1);
  const reduceMotion = !!useReducedMotion();
  const isInView = useInView(viewportRef, { margin: "0px 0px -50px 0px" });

  const updateLoopWidth = useCallback(() => {
    const el = containerRef.current;
    const viewport = viewportRef.current;
    if (!el || !viewport) return;

    const contentWidth = el.getBoundingClientRect().width / 2;
    loopWidthRef.current = contentWidth + gap;
    viewportWidthRef.current = viewport.getBoundingClientRect().width;
  }, [gap]);

  // NOTE: Cache track width so the transform calculation avoids per-frame layout reads.
  useLayoutEffect(() => {
    if (!children) return;
    const el = containerRef.current;
    const viewport = viewportRef.current;
    if (!el || !viewport) return;

    updateLoopWidth();

    const observer = new ResizeObserver(updateLoopWidth);
    observer.observe(el);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [children, updateLoopWidth]);

  // NOTE: Some layouts report zero width until the section is visible.
  // Re-measure when entering view so motion can begin immediately.
  useEffect(() => {
    if (!isInView) return;

    const rafId = requestAnimationFrame(updateLoopWidth);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, updateLoopWidth]);

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

  useEffect(() => {
    directionFactor.current = direction === "right" ? 1 : -1;
  }, [direction]);

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

    if (loopWidthRef.current <= 0) {
      updateLoopWidth();
      if (loopWidthRef.current <= 0) return;
    }

    if (changeDirection) {
      const velocity = scrollVelocity.get();
      if (velocity > 0) directionFactor.current = -1;
      if (velocity < 0) directionFactor.current = 1;
    }

    const boost = changeDirection && scrollBoost
      ? Math.abs(velocityFactor.get()) *
        (viewportWidthRef.current / REFERENCE_WIDTH)
      : 0;
    const moveBy =
      directionFactor.current *
      baseVelocity *
      (1 + boost) *
      (delta / 1000);

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={viewportRef}
      className={cn(
        "relative h-full w-full overflow-hidden",
        fadeSides && SIDE_FADE_MASK,
        className,
      )}
    >
      <motion.div
        className="absolute flex h-full flex-nowrap items-center whitespace-nowrap will-change-transform"
        ref={containerRef}
        style={{ x, gap: `${gap * 2}px` }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Marquee;
