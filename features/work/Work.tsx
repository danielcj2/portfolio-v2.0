"use client";

import LogoSpin from "@/animations/LogoSpin";
import LineFade from "@/animations/LineFade";
import HeadingFade from "@/animations/HeadingFade";
import HeadingTranslate from "@/animations/HeadingTranslate";
import Interlude from "./Interlude";
import WorkModals from "./modals/WorkModals";
import { useMediaQuery } from "@/providers/MediaQueryContext";
import TextScramble from "@/components/animations/TextScramble";

const Work = () => {
  const { isMobile, isLg } = useMediaQuery();

  return (
    <section
      id="work"
      className="relative z-0 h-min w-full overflow-x-clip pt-32 pb-10 md:pb-0"
    >
      <div className="mx relative mb-6 pr-3.5 pl-2 md:mx-auto! md:mb-8 md:w-min md:pb-8 lg:pb-36">
        <HeadingFade text="01" />
        <div className="flex justify-between gap-1 uppercase md:justify-center md:gap-0">
          <HeadingTranslate
            className="min-w-0 text-right text-[clamp(1rem,12.2vw,11.5rem)] tracking-tight"
            direction="left"
            text="Recent"
          />
          <LogoSpin
            className="shrink-0 translate-x-0.5 md:-translate-x-1"
            text="I'm still spinning ✦ don't mind me ✦"
          />
          <HeadingTranslate
            className="min-w-0 text-[clamp(1rem,12.2vw,11.5rem)] font-medium italic"
            direction="right"
            text="Work"
          />
        </div>
        <div className="text-muted bg-background mt-4 hidden cursor-default justify-between gap-2 pr-4 font-mono text-[0.8125rem] font-semibold uppercase md:mt-1.5 md:flex lg:text-sm xl:text-base">
          <TextScramble text="Featured Highlights" />
          <div className="relative flex-1 overflow-hidden">
            <div className="absolute top-1/2 right-0 left-0 h-px">
              <LineFade duration={3} />
            </div>
          </div>
          <TextScramble text="Client Projects" />
        </div>
      </div>
      <WorkModals />
      <Interlude />
    </section>
  );
};

export default Work;
