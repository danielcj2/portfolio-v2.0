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
} from "motion/react";
import { useState } from "react";
import { motionValue } from "motion/react";
import { useScrollContainer } from "@/providers/ScrollContext";
import { CONTACT_HEIGHT } from "@/lib/layoutHeights";

const TVStage = ({
  fastForward,
  buttons,
}: {
  fastForward?: boolean;
  buttons?: React.ReactNode;
}) => {
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({
    container,
    offset: [`end ${CONTACT_HEIGHT}`, "end end"],
  });

  const progress = fastForward ? motionValue(1) : scrollYProgress;

  const scale = useTransform(progress, [0, 1], [1, 0.4]);
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(progress, "change", (value) => {
    setVisible((isVisible) => {
      const nextVisible = value > 0;
      return isVisible === nextVisible ? isVisible : nextVisible;
    });
  });

  return (
    <motion.div
      id="screen-viewport"
      className="screen-viewport pointer-events-none fixed top-0 z-50"
      style={{ scale, transformOrigin: "center center" }}
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
