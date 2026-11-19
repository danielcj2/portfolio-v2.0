"use client";

import LineFade from "../animations/LineFade";
import TextFlip from "../animations/TextFlip";

import { useLenisScroll } from "@/lib/useLenisScroll";
import { useMediaQuery } from "@/providers/MediaQueryContext";
import { FOOTER_HEIGHT } from "@/lib/layoutHeights";

const Footer = () => {
  const { isMobile } = useMediaQuery();
  const { scrollTo } = useLenisScroll();

  return (
    <footer id="footer" className="relative z-1 font-sans">
      <div
        className="mx grid-12 relative h-full gap-y-2"
        style={{ gridTemplateRows: `0.5fr auto 1fr` }}
      >
        <div className="col-start-1 col-end-10 self-end px-1.5 py-2 text-3xl text-wrap capitalize md:py-0 md:text-4xl">
          <p className="text-muted pointer-events-auto font-medium">
            Scroll complete
          </p>
          <p className="text-muted pointer-events-auto font-medium">
            <span className="text-foreground">Dan</span> signing off
          </p>
        </div>
        <div className="col-start-10 col-end-13 self-end justify-self-end px-1.5 text-right">
          <button
            type="button"
            className="text-muted pointer-events-auto block w-min cursor-pointer! py-2 font-mono text-xs font-bold tracking-widest italic md:py-0"
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
    </footer>
  );
};

export default Footer;
