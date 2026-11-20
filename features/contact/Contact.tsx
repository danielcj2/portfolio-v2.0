"use client";

import Logo from "@/images/asterisk.svg";

import {
  CONTACT_HEIGHT,
  MOBILE_CONTACT_HEIGHT,
  MOBILE_TV_DURATION,
  MOBILE_TV_TRIGGER,
  TV_FINAL_SCALE,
  TV_TRANSFORM_ORIGIN_Y,
} from "@/lib/layoutHeights";

import React, { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import RowFade from "@/animations/RowFade";
import Marquee from "@/animations/Marquee";
import { useMediaQuery } from "@/providers/MediaQueryContext";

const items = [
  "Start a Conversation",
  "Hola, Let's Talk Ideas",
  "Connect with Me",
  "Bonjour, say it back!",
  "I'd love to hear from you",
  "Reach Out Anytime",
];

const Contact = () => {
  const { isMobile } = useMediaQuery();
  const contactHeight = isMobile ? MOBILE_CONTACT_HEIGHT : CONTACT_HEIGHT;
  const { scrollYProgress } = useScroll({
    offset: [`end ${contactHeight}`, "end end"],
  });
  const mobileProgress = useMotionValue(0);
  const mobileTarget = useRef(0);
  const mobileAnimation = useRef<{ stop: () => void } | null>(null);
  const animationProgress = isMobile ? mobileProgress : scrollYProgress;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!isMobile) return;

    const target = value >= MOBILE_TV_TRIGGER ? 1 : 0;
    if (mobileTarget.current === target) return;

    mobileTarget.current = target;
    mobileAnimation.current?.stop();
    mobileAnimation.current = animate(mobileProgress, target, {
      duration: MOBILE_TV_DURATION,
      ease: [0.22, 1, 0.36, 1],
    });
  });

  useEffect(() => {
    if (!isMobile) {
      mobileAnimation.current?.stop();
      mobileProgress.set(0);
      mobileTarget.current = 0;
    }

    return () => mobileAnimation.current?.stop();
  }, [isMobile, mobileProgress]);

  const marqueeY = useTransform(
    animationProgress,
    [0, 1],
    ["0vh", `${(50 - TV_TRANSFORM_ORIGIN_Y) * (TV_FINAL_SCALE - 1)}vh`],
  );

  const createMarquee = (items: string[]) =>
    [...items, ...items].map((item, index) => (
      <React.Fragment key={`${item}-${index}`}>
        <span>{item}</span>
        <Logo className="text-background [&_path]:fill-background/95 [&_path]:stroke-muted inline h-13 w-13 lg:h-15 lg:w-15" />
      </React.Fragment>
    ));

  return (
    <section
      id="contact"
      className="relative"
      style={{ height: contactHeight }}
    >
      <RowFade className="top-[-30vh] h-[60vh]" color={"[#c4c4c4]"} />
      <div className="absolute inset-x-0 top-[30vh] bottom-0 bg-[#c4c4c4]" />
      <motion.div
        className="sticky top-0 flex h-screen w-full items-center"
        style={{ y: marqueeY }}
      >
        <Marquee
          className="text-background font-sans text-[52px] font-medium tracking-[0.015em] lg:text-[64px]"
          options={{
            baseVelocity: isMobile ? 40 : 80,
            scrollBoost: false,
            gap: 24,
          }}
        >
          {createMarquee(items)}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default Contact;
