"use client";

import LogoSpin from "@/animations/LogoSpin";
import LineFade from "@/animations/LineFade";
import HeadingFade from "@/animations/HeadingFade";
import HeadingTranslate from "@/animations/HeadingTranslate";
import Interlude from "./Interlude";
import WorkModals from "./modals/WorkModals";
import { useMediaQuery } from "@/providers/MediaQueryContext";

const Work = () => {
  const { isMobile, isLg } = useMediaQuery();

  return (
    <section
      id="work"
      className="relative z-0 h-min w-full overflow-x-hidden pt-24 pb-10 md:pt-40 md:pb-0"
    >
      <div className="relative mx-auto mb-6 w-min md:mb-0">
        {!isMobile && <HeadingFade text="01" />}
        <div className="flex justify-center gap-1 uppercase md:gap-0">
          <HeadingTranslate
            className="min-w-0 text-right font-mono text-[clamp(1rem,12.5vw,11rem)] font-light tracking-tighter"
            direction="left"
            text="Recent"
          />
          <LogoSpin
            className="shrink-0 translate-x-1"
            text="I am still spinning ✦ don't mind me ✦"
          />
          <HeadingTranslate
            className="min-w-0 text-[clamp(1rem,12.5vw,11rem)] font-medium italic"
            direction="right"
            text="Work"
          />
        </div>
      </div>
      {!isMobile && (
        <div className="relative mt-8 flex items-center justify-center overflow-clip pt-28 pb-20">
          <div className="absolute top-0 h-full">
            <LineFade duration={3} direction="vertical" hasBadge="start" />
          </div>
          <div className="absolute top-1/4 h-[200%] origin-top rotate-50 xl:rotate-65">
            <LineFade duration={3} direction="vertical" />
          </div>
          <div className="absolute top-1/4 h-[200%] origin-top -rotate-50 xl:-rotate-65">
            <LineFade duration={3} direction="vertical" />
          </div>
          <p className="text-muted-v2 max-w-[30ch] text-center text-4xl leading-snug font-medium tracking-tighter">
            A selection of projects and experiences I&apos;ve had the pleasure
            of working on.
          </p>
        </div>
      )}
      <WorkModals />
      {!isMobile && isLg && <Interlude />}
    </section>
  );
};

export default Work;
