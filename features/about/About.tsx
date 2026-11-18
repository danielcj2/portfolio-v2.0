"use client";

import {
  CircleHalfTiltIcon,
  GlobeIcon,
  RectangleIcon,
  HourglassSimpleIcon,
} from "@phosphor-icons/react";
import Arrow from "@/assets/images/arrow.svg";
import LogoSpin from "@/animations/LogoSpin";
import LineFade from "@/animations/LineFade";
import HeadingFade from "@/animations/HeadingFade";
import HeadingTranslate from "@/animations/HeadingTranslate";
import TextScramble from "@/components/animations/TextScramble";
import TextFade from "@/components/animations/TextFade";
import Recorder from "./parts/Recorder";
import Table from "./parts/Table";

import { experience, services } from "./parts/bio";

const About = () => {
  return (
    <section
      id="about"
      className="h-min w-full overflow-x-clip pt-32 md:pt-42 lg:-mt-48 xl:-mt-23"
    >
      <div className="mx relative z-1 pr-4 pl-1 md:mx-auto! md:w-min md:pb-16 lg:pb-32">
        <HeadingFade text="02" />
        <div className="flex justify-between gap-1 uppercase md:justify-center md:gap-0">
          <HeadingTranslate
            className="min-w-0 text-right text-[clamp(1rem,16.5vw,15rem)]"
            direction="left"
            text="About"
          />
          <LogoSpin
            className="md:-translate-x-1/2"
            text="I'm still spinning ✦ don't mind me ✦"
          />
          <HeadingTranslate
            className="min-w-0 text-[clamp(1rem,16.5vw,15rem)] font-medium italic"
            direction="right"
            text="Me"
          />
        </div>
        <div className="text-muted flex cursor-default justify-between gap-2 pt-1 font-mono text-[0.8125rem] font-semibold uppercase md:-mt-1 md:gap-4 md:pr-4 lg:text-sm xl:text-base">
          <TextScramble text="Quiet Chaos" />
          <div className="relative flex-1 overflow-hidden">
            <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2">
              <LineFade duration={3} />
            </div>
          </div>
          <TextScramble text="Big Dreamer" />
        </div>
      </div>
      <div className="mx grid-12 relative z-0 gap-y-18 pt-20 pb-32 md:gap-y-24 lg:mt-20">
        <div className="sticky top-0 col-span-4 col-start-1 row-start-1 mt-[-70vh] -mb-20 hidden h-screen lg:block">
          <div className="absolute inset-x-8 inset-y-16 flex flex-col justify-end">
            <div className="mb-2.5">
              <p className="ml-1 inline font-mono text-sm font-medium tracking-wide uppercase">
                Pixelated kisses &#8226;{" "}
              </p>
              <span className="font-mono text-sm font-semibold text-[#959595]">
                Joji
              </span>
            </div>
            <Recorder />
          </div>
        </div>
        <div className="relative col-span-2 col-start-3 row-start-1 hidden justify-self-center lg:block">
          <div className="parallax">
            <div className="max-w-[20ch]">
              <p className="text-muted indent-[15%] text-sm font-medium tracking-[0.015em]">
                The soundtrack behind this version of me.{" "}
              </p>
            </div>
            <Arrow className="h-auto w-14 -rotate-10" />
          </div>
        </div>
        <div className="relative col-span-full row-start-1 lg:col-start-7">
          <div className="text-muted flex flex-col gap-6.5 text-[22px] leading-snug font-medium text-pretty md:text-[29.5px] lg:gap-10 lg:pr-5">
            <p className="indent-[18vw] lg:indent-[8vw]">
              Frontend Developer based in <TextFade>Toronto,</TextFade> Canada.{" "}
              My path spans <TextFade>three different countries,</TextFade>{" "}
              filled with experiences that have shaped{" "}
              <CircleHalfTiltIcon className="inline size-6 md:size-7.5" /> how I
              perceive and approach building things.
            </p>
            <p>
              Being exposed to different cultures{" "}
              <GlobeIcon className="inline size-6 md:size-7.5" /> and
              perspectives made me <TextFade>naturally curious.</TextFade> I
              enjoy exploring unfamiliar places, trying new things, and
              occasionally stepping outside my comfort zone{" "}
              <RectangleIcon className="inline size-6 md:size-7.5" />. I've also
              always had a bit of a <TextFade>thrill-seeking</TextFade> side.
            </p>
            <p>I build stuff for the web.</p>
          </div>
        </div>
        <div className="col-span-full lg:col-start-7 lg:pr-5">
          <Table {...experience} />
        </div>
        <div className="col-span-full lg:col-start-7 lg:pr-5">
          <div className="text-muted text-[22px] leading-snug font-medium text-pretty md:text-[29.5px]">
            <p className="indent-[18vw] lg:indent-[8vw]">
              I graduated in <TextFade>2022</TextFade> with a BSc
              <sup className="font-mono text-[0.75em] tracking-tighter">
                (Honours)
              </sup>{" "}
              in Computer Science, from Trent University.
            </p>
            <p className="mt-6">
              Since then, I've spent my time{" "}
              <HourglassSimpleIcon className="inline size-7 md:size-7.5" />{" "}
              exploring and experimenting with new tools, figuring out what{" "}
              <TextFade>I enjoy building.</TextFade>
            </p>
          </div>
        </div>
        <div className="col-span-full lg:col-start-7 lg:pr-5">
          <Table {...services} />
        </div>
      </div>
    </section>
  );
};

export default About;
