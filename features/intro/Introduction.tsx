"use client";

import {
  ArrowDownIcon,
  AtomIcon,
  CoffeeBeanIcon,
  LeafIcon,
} from "@phosphor-icons/react";

import Logo from "@/images/logo.svg";

import LineFade from "@/animations/LineFade";
import TextFade from "@/animations/TextFade";
import BentoBox from "./BentoBox";
import { useLenisScroll } from "@/providers/LenisContext";

// REMINDER - [] For lower width screens, reduce the number of cols and adjust gaps/ col spans accordingly

const Introduction = () => {
  const { scrollTo } = useLenisScroll();

  return (
    <section
      id="intro"
      className="relative z-0 h-min min-h-screen w-full py-24"
    >
      <div className="mx grid-12 relative gap-x-0">
        <div className="text-muted-v2 col-span-full text-center indent-[34%] text-[42px] leading-snug font-medium tracking-tighter text-pretty">
          <p>
            Slightly chaotic <TextFade>Frontend Developer</TextFade>
            <sup className="text-[0.5em]">(3+ years)</sup> — breaking things
            just to fix them better, nudging interactions and{" "}
            <TextFade>refining</TextFade> the small{" "}
            <AtomIcon className="-mr-1 inline" size={28} /> behaviours that make
            complex <TextFade>interfaces</TextFade> feel simple, fast, and
            natural <LeafIcon className="-mr-1 inline" size={28} />. Always
            curious, <TextFade>endlessly</TextFade> iterating... caffeine{" "}
            <CoffeeBeanIcon className="-mr-1 inline" size={28} /> is my
            co-pilot.
            <ArrowDownIcon className="relative inset-y-4 inline" size={28} />
          </p>
        </div>
        <div className="text-muted col-start-1 col-end-6 grid grid-cols-subgrid self-center">
          <div className="col-span-2 flex items-center justify-end gap-1 text-[0.8125rem] leading-loose font-medium">
            <p>Learn more </p>
            <a
              href="#about"
              className="text-foreground hover:text-accent underline underline-offset-2 transition-colors duration-300 ease-in-out"
              onClick={(e) => { e.preventDefault(); scrollTo("#about"); }}
            >
              about me
            </a>
            <span className="-ml-1">!</span>
          </div>
          <div className="flex gap-1 self-center px-1" aria-hidden="true">
            {/* TODO [] - animate logos? */}
            {Array.from({ length: 3 }).map((_, i) => (
              <Logo key={i} className="text-muted-v2 inline h-5 w-5" />
            ))}
          </div>
        </div>
        <div className="text-muted-v2 col-start-9 col-end-13 my-24 grid h-min grid-cols-subgrid self-center text-xs leading-snug font-semibold text-balance uppercase [word-spacing:2px]">
          <div className="col-span-2 text-end">
            <p className="float-right max-w-[20ch] px-1">
              What feels simple on the surface
            </p>
          </div>
          <div className="col-start-3 col-end-5 row-start-2">
            <p className="-mt-1 max-w-[20ch]">
              often carries the most thought underneath...
            </p>
          </div>
        </div>
        <div className="absolute inset-0 -z-1 flex h-full w-full justify-between">
          <LineFade count={7} duration={3} direction="vertical" />
        </div>
      </div>
      <BentoBox />
    </section>
  );
};

export default Introduction;
