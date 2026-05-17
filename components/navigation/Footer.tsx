"use client";

import LineFade from "../animations/LineFade";
import TextFlip from "../animations/TextFlip";

import { useLenisScroll } from "@/providers/LenisContext";
import { useMediaQuery } from "@/providers/MediaQueryContext";
import { FOOTER_HEIGHT, FOOTER_REVEAL_BUFFER } from "@/lib/layoutHeights";

const Footer = () => {
  const { isMobile } = useMediaQuery();
  const { scrollTo } = useLenisScroll();

  return (
    <footer
      id="footer"
      className="relative z-1 md:[clip-path:polygon(0%_0,100%_0,100%_200%,0_200%)]"
      style={{
        top: isMobile ? 0 : `-${FOOTER_REVEAL_BUFFER}`,
        height: FOOTER_HEIGHT,
      }}
    >
      <div
        className="bg-background pointer-events-none relative z-1 w-screen md:fixed md:bottom-0"
        style={{ height: FOOTER_HEIGHT }}
      >
        <div className="mx pointer-events-none absolute bottom-0 left-0 flex h-screen w-full justify-around opacity-70 md:justify-between">
          <LineFade
            count={isMobile ? 3 : 7}
            duration={7}
            direction="vertical"
          />
        </div>
        <div
          className="mx grid-12 relative h-full gap-y-2"
          style={{
            gridTemplateRows: `0.5fr auto 1fr`,
          }}
        >
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
    </footer>
  );
};

export default Footer;
