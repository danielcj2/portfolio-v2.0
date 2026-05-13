"use client";

import Recorder from "./parts/Recorder";
import HeadingTranslate from "@/animations/HeadingTranslate";
import LogoSpin from "@/animations/LogoSpin";
import LineFade from "@/animations/LineFade";
import Shape from "@/images/shape.svg";

import { motion } from "motion/react";

const Song = () => {
  return (
    <div
      className="mx grid-12 relative z-0 h-160 md:h-220 xl:h-screen"
      style={{
        gridTemplateRows: "auto repeat(4, minmax(0, 1fr))",
      }}
    >
      <div className="col-start-1 col-end-13 justify-self-center md:col-start-6 md:col-end-8">
        <p className="text-muted-v2 mb-2 max-w-[30ch] text-center text-xs leading-snug font-semibold text-pretty uppercase [word-spacing:2px]">
          Finding focus and flow through music.
        </p>
      </div>
      <div className="col-span-full row-start-2">
        <div className="flex items-center justify-center gap-1 uppercase">
          <HeadingTranslate
            className="min-w-0 text-right font-mono text-[clamp(1rem,16vw,11rem)] font-light tracking-tighter md:pr-5"
            direction="left"
            text="On"
          />
          <LogoSpin
            className="translate-x-1"
            text="I am still spinning ✦ don't mind me ✦"
          />
          <HeadingTranslate
            className="min-w-0 text-[clamp(1rem,16vw,11rem)] font-medium italic"
            direction="right"
            text="Repeat"
          />
        </div>
      </div>
      <div className="text-muted-v2 -z-1 col-start-1 col-end-13 row-start-3 mb-2 hidden grid-cols-subgrid self-end text-3xl leading-snug font-medium tracking-tighter text-balance lg:grid xl:text-4xl">
        <p className="col-start-1 col-end-6">The soundtrack behind...</p>
        <p className="col-start-7 col-end-13 text-end">
          ...this <span className="text-muted mr-0.5 italic">version</span> of
          me.
        </p>
      </div>
      <div className="col-start-5 col-end-9 row-start-3 row-end-5 self-center justify-self-center pt-4">
        <Recorder />
        <div className="flex justify-center pt-4 text-nowrap">
          <a
            href="https://open.spotify.com/track/2OZVskV28xxJjjhQqKTLSg?si=eaaaca62f3da412d"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Listen to Pixelated Kisses on Spotify"
          >
            <motion.div
              className="ml-px flex items-center gap-1.5"
              initial="initial"
              whileHover="hovered"
            >
              <p className="font-chakra text-sm font-medium tracking-wider uppercase [word-spacing:4px]">
                Pixelated Kisses
              </p>
              <motion.div
                aria-hidden="true"
                className="bg-accent h-4 w-4 [clip-path:polygon(50%_0%,0%_0%,0%_50%)]"
                variants={{
                  initial: { opacity: 0.5, filter: "grayscale(100%)" },
                  hovered: { opacity: 1, filter: "grayscale(0%)" },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </a>
        </div>
      </div>

      <div className="-z-1 col-span-full row-start-4">
        <LineFade duration={3} direction="horizontal" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-1 hidden md:block">
        <Shape
          aria-hidden="true"
          className="relative left-1/2 h-[200%] w-auto -translate-x-1/2 stroke-[rgba(255,255,255,0.04)]"
        />
      </div>
    </div>
  );
};

export default Song;
