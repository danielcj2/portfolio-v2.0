"use client";

import Shape from "@/images/shape.svg";
import Logo from "@/images/logo.svg";
import Spiral from "@/images/spiral.svg";

import LineFade from "@/animations/LineFade";
import BungeeJump from "./parts/BungeeJump";
import StaggerReveal from "./parts/StaggerReveal";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { useScrollContainer } from "@/providers/ScrollContext";

const Interlude = () => {
  const target = useRef<HTMLDivElement>(null);
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({
    target,
    container,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: pendulumProgress } = useScroll({
    target,
    container,
    offset: ["end end", "end center"],
  });

  const transform = useTransform(
    scrollYProgress,
    [0, 0.25, 0.95, 1],
    [0, 0, -180, -180],
  );
  const rotate = useSpring(transform, { stiffness: 400, damping: 90 });
  const counterRotate = useTransform(rotate, (v) => -v);
  const fade = useTransform(transform, [-100, -120, -160, -180], [0, 1, 0, 0]);

  return (
    <div className="mx relative z-0 lg:-mt-24 xl:mt-32 h-[350vh]" ref={target}>
      <div className="sticky top-0 h-screen w-full">
        <div className="relative top-1/2 grid aspect-square h-auto w-full -translate-y-1/2 grid-cols-6 grid-rows-4 overflow-hidden p-18">
          <motion.div
            className="pointer-events-none absolute inset-0 z-1"
            style={{ rotate }}
          >
            <Shape
              className="absolute inset-0 h-auto w-full stroke-[rgba(255,255,255,0.05)] stroke-1"
              aria-hidden
            />
            {/* MAKE LINE PART OF THE SHAPE SVG? AND ANIMATE TRAIL?  */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
              <LineFade duration={3} direction="horizontal" />
            </div>
            <div className="center-xy bg-accent flex h-15 w-15 items-center justify-center [clip-path:polygon(50%_0%,86%_14%,100%_50%,86%_86%,50%_100%,14%_86%,0%_50%,14%_14%)]">
              <Logo className="text-background h-8 w-8 rotate-20" />
            </div>
          </motion.div>
          <StaggerReveal progress={scrollYProgress} />
          <div className="text-muted-v2 -z-2 col-start-1 col-end-7 row-start-3 mt-8 grid grid-cols-subgrid text-4xl leading-snug font-medium tracking-tighter">
            <p className="col-start-1 col-end-4">Beyond the screens...</p>
            <p className="col-start-4 col-end-7 text-end">
              Meet <span className="text-muted mr-0.5 italic">the humble</span>{" "}
              creator.
            </p>
            <motion.p
              className="col-start-4 px-2 text-xs tracking-wider uppercase"
              style={{ opacity: fade }}
            >
              Woooosh!
            </motion.p>
          </div>
          <div className="pointer-events-none absolute inset-0">
            <BungeeJump rotate={rotate} pendulumProgress={pendulumProgress} />
            <motion.div
              className="bg-background pointer-events-none absolute bottom-0 h-1/2 w-full origin-top"
              style={{ rotate }}
            />
            <div className="center-xy pointer-events-none h-1/4 w-1/4">
              <motion.div
                className="h-full w-full"
                style={{ rotate, clipPath: "inset(50% 0% 0% 0%)" }}
              >
                <motion.div style={{ rotate: counterRotate }}>
                  <Spiral className="h-auto w-full fill-[rgba(255,255,255,0.05)]" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interlude;
