"use client";

import Timestamp from "@/ui/Timestamp";
import WorkStatus from "./parts/WorkStatus";
import ScrollIndicator from "./parts/ScrollIndicator";
import HeroText from "./parts/HeroText";

import { motionValue, useReducedMotion, useScroll } from "motion/react";
import { useMemo, useRef } from "react";
import { useLenisScroll } from "@/providers/LenisContext";
import { useScrollContainer } from "@/providers/ScrollContext";
import { useMediaQuery } from "@/providers/MediaQueryContext";

const Hero = () => {
  const { scrollTo } = useLenisScroll();
  const target = useRef<HTMLElement>(null);
  const container = useScrollContainer();
  const { isMobile } = useMediaQuery();
  const shouldReduceMotion = useReducedMotion();
  const staticProgress = useMemo(() => motionValue(0.5), []);
  const disableScrollFx = isMobile || shouldReduceMotion;

  const { scrollYProgress } = useScroll({
    container,
    target,
    offset: ["start end", "end start"],
  });

  const progress = disableScrollFx ? staticProgress : scrollYProgress;

  return (
    <section
      id="hero"
      className="z-0 flex min-h-[80vh] w-full flex-1 flex-col justify-between overflow-hidden pt-8 md:h-screen md:min-h-svh md:pb-8"
      ref={target}
    >
      <HeroText progress={progress} />
      <div className="mx mt-8 mb-auto grid grid-cols-1 items-end md:my-0 md:grid-cols-[15rem_1fr_15rem]">
        <WorkStatus status="LFW" />
        <div className="justify-self-start md:justify-self-center">
          <ScrollIndicator
            progress={progress}
            onClick={() => scrollTo("#intro")}
          />
        </div>
        <div className="hidden px-4 py-1.75 text-right md:block">
          <Timestamp />
        </div>
      </div>
    </section>
  );
};

export default Hero;
