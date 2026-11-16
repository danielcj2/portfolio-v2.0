"use client";

import {
  ArrowDownIcon,
  AtomIcon,
  CoffeeBeanIcon,
  LeafIcon,
} from "@phosphor-icons/react";

import Logo from "@/images/logo.svg";

import { useMediaQuery } from "@/providers/MediaQueryContext";

import BentoBox from "./BentoBox";
import TextFade from "@/animations/TextFade";
import RowFade from "@/components/animations/RowFade";
import CueButton from "./CueButton";

const Introduction = () => {
  const { isMobile, isLg } = useMediaQuery();

  return (
    <section
      id="intro"
      className="relative z-0 h-min w-full bg-neutral-900 py-10 md:pb-52"
    >
      <div className="mx grid-12 relative mt-8 mb-16 gap-x-0 gap-y-10 md:mt-24 md:mb-0">
        <div className="col-span-full md:col-start-2 md:col-end-12">
          <p className="text-muted indent-[12%] font-sans text-[26px] leading-snug font-medium tracking-[0.015em] text-pretty md:text-[34.5px]">
            Slightly obsessive <TextFade>Frontend Developer</TextFade>
            <sup className="font-mono text-[0.6em] tracking-tighter">
              (3+ years)
            </sup>{" "}
            — breaking things just to fix them better,{" "}
            <span className="hidden md:inline">nudging interactions</span> and{" "}
            <TextFade>refining</TextFade> the small{" "}
            <AtomIcon className="inline" size={30} /> behaviours that make{" "}
            <TextFade>interfaces</TextFade> feel simple, fast, and natural{" "}
            <LeafIcon className="inline" size={30} />. Always curious,{" "}
            <TextFade>endlessly</TextFade> iterating, often losing track of
            time... caffeine <CoffeeBeanIcon className="inline" size={30} /> is
            my co-pilot.
            <ArrowDownIcon className="relative inset-y-4 inline" size={30} />
          </p>
        </div>
        <div className="col-span-2 col-start-2 mb-24 hidden md:block">
          <CueButton />
        </div>
        <div className="col-span-full hidden grid-cols-subgrid md:grid">
          <div className="border-muted/20 col-span-2 col-start-7 row-start-2 self-end justify-self-end border-r px-3.5">
            <p className="text-muted max-w-[12ch] text-end font-mono text-sm leading-snug font-semibold uppercase">
              Reveal what lies beneath
            </p>
          </div>
          <div className="border-muted/20 col-span-2 col-start-9 row-start-2 flex justify-between self-end border-r pr-3.5 pl-2.75">
            <div
              className="text-muted/80 flex gap-1 self-end pb-1"
              aria-hidden="true"
            >
              {/* TODO [] - animate logos? */}
              {Array.from({ length: 3 }).map((_, i) => (
                <Logo key={i} className="inline h-5 w-5 -scale-x-100" />
              ))}
            </div>
            <p className="text-muted max-w-[10ch] text-end font-mono text-sm leading-snug font-semibold uppercase">
              A few snippets
            </p>
          </div>
          <div className="col-span-2 col-start-11 row-start-2 mx-3.25 self-end">
            <p className="text-muted mt-4.75 font-mono text-sm leading-snug font-semibold uppercase">
              Made with care
            </p>
          </div>
        </div>
      </div>
      {!isMobile && isLg && <BentoBox />}
      <RowFade className="h-[60vh]" color="background" offset={0.15} />
    </section>
  );
};

export default Introduction;
