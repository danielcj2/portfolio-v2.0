"use client";

import { useScroll, motion, useTransform } from "motion/react";

import LineFade from "../animations/LineFade";
import TextFlip from "../animations/TextFlip";

import { useScrollContainer } from "@/providers/ScrollContext";
import { useLenisScroll } from "@/providers/LenisContext";
import { useMediaQuery } from "@/providers/MediaQueryContext";
import { FOOTER_HEIGHT, FOOTER_SCROLL_TOP_OFFSET } from "@/lib/layoutHeights";

const Footer = () => {
  const container = useScrollContainer();
  const { isMobile } = useMediaQuery();
  const { scrollTo } = useLenisScroll();
  const { scrollYProgress } = useScroll({
    container,
    offset: [`end ${FOOTER_SCROLL_TOP_OFFSET}`, `end ${FOOTER_HEIGHT}`],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.75], [250, 0]);

  return (
    <>
      {/* BUFFER */}
      <div
        className="bg-background relative z-1"
        style={{ height: FOOTER_HEIGHT }}
      />
      <motion.footer
        className="pointer-events-none fixed bottom-0 z-1 flex w-screen origin-bottom flex-col items-center"
        style={{
          height: FOOTER_HEIGHT,
          opacity,
          y,
        }}
      >
        <div className="size-full">
          <div
            className="mx grid-12 relative h-full gap-y-2"
            style={{
              gridTemplateRows: `0.5fr auto 1fr`,
            }}
          >
            <div className="pointer-events-none absolute bottom-0 left-0 flex h-screen w-full justify-around opacity-70 md:justify-between">
              <LineFade
                count={isMobile ? 3 : 7}
                duration={7}
                direction="vertical"
              />
            </div>
            <div className="col-start-1 col-end-10 self-end px-1.5 py-2 text-3xl text-wrap capitalize md:py-0 md:text-4xl">
              <p className="text-muted-v2 pointer-events-auto font-semibold">
                Scroll complete
              </p>
              <p className="text-muted-v2 pointer-events-auto font-semibold">
                <span className="text-foreground">Dan</span> signing off
              </p>
            </div>
            <div className="col-start-10 col-end-13 self-end justify-self-end px-1.5 text-right">
              <button
                type="button"
                className="text-muted-v2 font-chakra pointer-events-auto block w-min cursor-pointer! py-2 text-xs font-bold tracking-widest italic md:py-0"
                onClick={() => scrollTo("#hero")}
              >
                <TextFlip>back to top &#8593;</TextFlip>
              </button>
            </div>
            <div className="col-span-full">
              <div className="h-1 w-full bg-[rgba(255,255,255,0.02)]" />
            </div>
            <div className="col-start-1 col-end-13 row-start-3 px-1.5 py-2 text-sm md:py-0 md:text-base">
              <p className="pointer-events-auto text-sm">
                © 2026
                <span className="mx-1">&#8226;</span>
                by me
                <span className="mx-1">&#8226;</span>
                all rights reserved
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
