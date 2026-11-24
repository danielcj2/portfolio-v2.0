"use client";

import TVShell from "@/components/tv/TVShell";
import TVNav from "@/components/tv/TVNav";
import Scanlines from "../ui/Scanlines";
import Blur from "../ui/Blur";

import {
  AnimatePresence,
  motion,
  motionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { useMemo, useState } from "react";
import { useMediaQuery } from "@/providers/MediaQueryContext";
import {
  CONTACT_HEIGHT,
  MOBILE_CONTACT_HEIGHT,
  TV_FINAL_SCALE,
  TV_TRANSFORM_ORIGIN_Y,
} from "@/lib/layoutHeights";

const TVStage = ({
  fastForward,
  buttons,
}: {
  fastForward?: boolean;
  buttons?: React.ReactNode;
}) => {
  const { isMobile } = useMediaQuery();
  const contactHeight = isMobile ? MOBILE_CONTACT_HEIGHT : CONTACT_HEIGHT;
  const { scrollYProgress } = useScroll({
    offset: [`end ${contactHeight}`, "end end"],
  });
  const fastProgress = useMemo(() => motionValue(1), []);
  const progress = fastForward ? fastProgress : scrollYProgress;

  const desktopScaleX = useTransform(progress, [0, 1], [1, TV_FINAL_SCALE]);
  const mobileTranslateY = useTransform(progress, [0, 1], ["0vh", "-65vh"]);
  const scaleY = useTransform(progress, [0, 1], [1, TV_FINAL_SCALE]);
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(progress, "change", (value) => {
    setVisible((isVisible) => {
      const nextVisible = value > 0;
      return isVisible === nextVisible ? isVisible : nextVisible;
    });
  });

  return (
    <motion.div
      className="screen-viewport pointer-events-none fixed top-0 z-50"
      style={
        {
          "--tv-desktop-scale-x": desktopScaleX,
          scaleY: isMobile ? 1 : scaleY,
          y: isMobile ? mobileTranslateY : 0,
          transformOrigin: `center ${TV_TRANSFORM_ORIGIN_Y}%`,
        } as MotionStyle
      }
    >
      <TVShell progress={isMobile ? motionValue(0) : progress}>
        <TVNav buttons={buttons} />
      </TVShell>
      <div className="relative h-screen w-screen">
        <Scanlines />
        <div className="crt-vignette" />
        <Blur className="absolute inset-x-0 top-(--gap) h-28 -scale-y-100" />
        <div className="screen-frame" />
        <AnimatePresence>
          {!isMobile && visible && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[48px]"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.5), transparent 40%)",
                boxShadow: `inset -20px -20px 100px 10px #5c5c5c, 
                          inset 40px 40px 100px #5c5c5c,
                          inset 12px 12px 12px #1a1a1a`,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TVStage;
