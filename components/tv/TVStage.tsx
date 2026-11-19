"use client";

import TVShell from "@/components/tv/TVShell";
import TVNav from "@/components/tv/TVNav";
import Scanlines from "../ui/Scanlines";
import Blur from "../ui/Blur";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { useState } from "react";
import { motionValue } from "motion/react";
import { CONTACT_HEIGHT } from "@/lib/layoutHeights";

const finalScale = 0.4;
const mobileScaleTarget = 1.2;

const TVStage = ({
  fastForward,
  buttons,
}: {
  fastForward?: boolean;
  buttons?: React.ReactNode;
}) => {
  const { scrollYProgress } = useScroll({
    offset: [`end ${CONTACT_HEIGHT}`, "end end"],
  });

  const progress = fastForward ? motionValue(1) : scrollYProgress;

  const desktopScaleX = useTransform(progress, [0, 1], [1, finalScale]);
  const mobileScaleX = useTransform(progress, [0, 1], [1, mobileScaleTarget]);
  const mobileCounterScaleX = useTransform(
    progress,
    [0, 1],
    [1, finalScale / mobileScaleTarget],
  );
  const scaleY = useTransform(progress, [0, 1], [1, finalScale]);
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
          "--tv-mobile-scale-x": mobileScaleX,
          "--tv-mobile-counter-scale-x": mobileCounterScaleX,
          scaleY,
          transformOrigin: "center center",
        } as MotionStyle
      }
    >
      <TVShell progress={progress}>
        <TVNav buttons={buttons} />
      </TVShell>
      <div className="relative h-svh w-screen">
        <Scanlines />
        <div className="crt-vignette" />
        <Blur className="absolute inset-x-0 top-(--gap) h-28 -scale-y-100" />
        <div className="screen-frame" />
        <AnimatePresence>
          {visible && (
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
