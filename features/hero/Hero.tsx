"use client";

import Timestamp from "./parts/Timestamp";
import ScrollIndicator from "./parts/ScrollIndicator";
import HeroText from "./parts/HeroText";

import { motionValue, useScroll, motion, MotionConfig } from "motion/react";
import { useMemo, useRef } from "react";
import { useLenisScroll } from "@/lib/useLenisScroll";
import { useMediaQuery } from "@/providers/MediaQueryContext";

const Hero = () => {
  const { scrollTo } = useLenisScroll();
  const target = useRef<HTMLElement>(null);
  const { isMobile } = useMediaQuery();
  const staticProgress = useMemo(() => motionValue(0.5), []);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const progress = isMobile ? staticProgress : scrollYProgress;

  return (
    <section
      id="hero"
      className="z-0 flex min-h-[96svh] w-full flex-1 flex-col justify-between overflow-hidden py-4 md:h-screen md:min-h-svh md:py-12"
      ref={target}
    >
      <MotionConfig reducedMotion="user">
        <HeroText progress={progress} />
        <motion.div className="grid-12 mx">
          <div className="relative col-span-3 mr-2 h-full md:ml-5">
            <ScrollIndicator onClick={() => scrollTo("#intro")} />
          </div>
          <div className="col-span-4 col-end-13 hidden overflow-hidden px-8 text-right md:block">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
            >
              <Timestamp />
            </motion.div>
          </div>
        </motion.div>
      </MotionConfig>
    </section>
  );
};

export default Hero;
