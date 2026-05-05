"use client";

import { useScroll, motion, useTransform } from "motion/react";

import LineFade from "../animations/LineFade";
import TextFlip from "../animations/TextFlip";

import { useScrollContainer } from "@/providers/ScrollContext";
import { useLenisScroll } from "@/providers/LenisContext";

const FOOTER_HEIGHT = "75vh";
const TOP = "175vh";

const Footer = () => {
  const container = useScrollContainer();
  const { scrollTo } = useLenisScroll();
  const { scrollYProgress } = useScroll({
    container,
    offset: [`end ${TOP}`, `end ${FOOTER_HEIGHT}`],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.75], [250, 0]);
  const pointerEvents = useTransform(scrollYProgress, (v) =>
    v >= 0.25 ? "auto" : "none",
  );

  return (
    <>
      {/* BUFFER */}
      <div
        className="bg-background relative z-1"
        style={{ height: FOOTER_HEIGHT }}
      />
      <motion.footer
        className="fixed bottom-0 z-1 flex w-screen origin-bottom flex-col items-center overflow-clip"
        style={{
          pointerEvents,
          height: FOOTER_HEIGHT,
          opacity,
          y,
        }}
      >
        <div className="size-full">
          <div
            className="mx grid-12 relative h-full gap-y-2"
            style={{
              gridTemplateRows: `1fr auto 0.5fr`,
            }}
          >
            <div className="pointer-events-none absolute inset-0 col-start-1 col-end-13 flex justify-between opacity-70">
              <LineFade count={7} duration={7} direction="vertical" />
            </div>
            <div className="col-start-1 col-end-3 self-end px-1.5 text-wrap capitalize">
              <p className="text-muted-v2 text-4xl font-semibold">
                Scroll complete
              </p>
              <p className="text-muted-v2 text-4xl font-semibold">
                <span className="text-foreground">Dan</span> signing off
              </p>
            </div>
            <div className="col-start-10 col-end-13 self-end justify-self-end px-1.5 text-right">
              <button
                type="button"
                className="text-muted-v2 font-chakra block w-min cursor-pointer! text-xs font-bold tracking-widest italic"
                onClick={() => scrollTo("#hero")}
              >
                <TextFlip>back to top &#8593;</TextFlip>
              </button>
            </div>
            <div className="col-span-full">
              <div className="h-1 w-full bg-[rgba(255,255,255,0.02)]" />
            </div>
            <div className="col-start-1 col-end-3 row-start-3 px-1.5">
              <p className="text-sm">
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
