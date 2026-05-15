"use client";

import TextFlip from "@/animations/TextFlip";
import LogoSpin from "@/animations/LogoSpin";
import LineFade from "@/animations/LineFade";
import HeadingFade from "@/animations/HeadingFade";
import HeadingTranslate from "@/animations/HeadingTranslate";
import Album, { Photo1, Photo2, Photo4 } from "./Album";
import Song from "./Song";
import { Education, Experience, Services, ShortBio, Techstack } from "./Bio";
import { useMediaQuery } from "@/providers/MediaQueryContext";


const About = () => {
  const { isMobile, isLg } = useMediaQuery();

  return (
    <section
      id="about"
      className="h-min w-full pt-24 md:pt-42 lg:-mt-48 xl:-mt-24"
    >
      <div className="relative z-0 m-auto w-min pb-8 md:pb-32">
        {!isMobile && <HeadingFade text="02" />}
        <div className="flex justify-center gap-1 uppercase md:gap-0">
          <HeadingTranslate
            className="min-w-0 text-right font-mono text-[clamp(1rem,18vw,15rem)] font-light tracking-tighter"
            direction="left"
            text="About"
          />
          <LogoSpin
            className="translate-x-1"
            text="I am still spinning ✦ don't mind me ✦"
          />
          <HeadingTranslate
            className="min-w-0 text-[clamp(1rem,18vw,15rem)] font-medium italic"
            direction="right"
            text="Me"
          />
        </div>
        <div className="text-muted-v2 font-chakra bg-background mt-1 flex cursor-default justify-between gap-2 text-[0.8125rem] font-semibold tracking-wider uppercase md:mt-0 md:text-sm">
          <TextFlip>Quiet Chaos</TextFlip>
          <div className="relative flex-1 overflow-hidden">
            <div className="absolute top-1/2 right-0 left-0 h-px">
              <LineFade duration={3} />
            </div>
          </div>
          <TextFlip>Big Dreamer</TextFlip>
        </div>
      </div>
      <div className="relative z-0 pb-32">
        {!isMobile && isLg && <Album />}
        <div className="grid-12 mx pointer-events-none absolute inset-0 z-0 h-full">
          <div className="absolute inset-0 col-start-1 col-end-13 flex justify-around md:justify-between">
            <LineFade
              duration={16}
              count={isMobile ? 3 : !isLg ? 5 : 7}
              direction="vertical"
              hasBadge={isMobile || !isLg ? "none" : "both"}
            />
          </div>
          <div className="bg-background absolute top-0 left-0 h-32 w-full [clip-path:polygon(95%_0,90%_35%,50%_100%,10%_35%,5%_0)]" />
          <div className="bg-background absolute bottom-0 left-0 h-32 w-full -scale-y-100 [clip-path:polygon(95%_0,90%_35%,50%_100%,10%_35%,5%_0)]" />
        </div>
        {(isMobile || !isLg) && (
          <div
            className="mx flex justify-center pt-12"
            style={{ contentVisibility: "auto", containIntrinsicSize: "0 540px" }}
          >
            <div className="flex w-[80%] rotate-3 justify-center">
              <Photo1 />
            </div>
          </div>
        )}
        <ShortBio />
        <Experience />
        <Education />
        {(isMobile || !isLg) && (
          <div
            className="mx flex justify-center pt-12 pb-24"
            style={{ contentVisibility: "auto", containIntrinsicSize: "0 540px" }}
          >
            <div className="flex w-[80%] -rotate-3 justify-center">
              <Photo2 />
            </div>
          </div>
        )}
        <Services />
        {(isMobile || !isLg) && (
          <div
            className="mx flex justify-center pt-18 pb-24 md:pb-18"
            style={{ contentVisibility: "auto", containIntrinsicSize: "0 540px" }}
          >
            <div className="flex w-[70%] max-w-80 rotate-3 justify-center">
              <Photo4 />
            </div>
          </div>
        )}
        {!isMobile && <Techstack />}
      </div>
      <div className="overflow-clip">
      <Song />
      </div>
    </section>
  );
};

export default About;
