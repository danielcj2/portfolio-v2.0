"use client";

import Timestamp from "@/ui/Timestamp";
import WorkStatus from "./parts/WorkStatus";
import ScrollIndicator from "./parts/ScrollIndicator";
import HeroText from "./parts/HeroText";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { useLenisScroll } from "@/providers/LenisContext";
import { useScrollContainer } from "@/providers/ScrollContext";

const Hero = () => {
  const { scrollTo } = useLenisScroll();
  const target = useRef<HTMLElement>(null);
  const container = useScrollContainer();

  const { scrollYProgress } = useScroll({
    container,
    target,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="hero"
      className="z-0 flex h-screen min-h-screen w-full flex-1 flex-col justify-between py-8"
      ref={target}
    >
      <HeroText progress={scrollYProgress} />
      <div className="mx grid grid-cols-[15rem_1fr_15rem] items-end">
        <WorkStatus status="LFW" />
        <div className="justify-self-center">
          <ScrollIndicator
            progress={scrollYProgress}
            onClick={() => scrollTo("#intro")}
          />
        </div>
        <div className="px-4 py-1.75 text-right">
          <Timestamp />
        </div>
      </div>
    </section>
  );
};

export default Hero;
