"use client";

import Logo from "@/images/asterisk.svg";

import {
  CONTACT_HEIGHT,
  TV_FINAL_SCALE,
  TV_TRANSFORM_ORIGIN_Y,
  TV_OFFSET,
} from "@/lib/layoutHeights";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
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
  const offset = isMobile ? "165vh" : TV_OFFSET;
  const contactHeight = isMobile ? "100vh" : CONTACT_HEIGHT;
  const { scrollYProgress } = useScroll({
    offset: [`end ${offset}`, "end end"],
  });

  const desktopMarqueeY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vh", `${(50 - TV_TRANSFORM_ORIGIN_Y) * (TV_FINAL_SCALE - 1)}vh`],
  );

  const mobileMarqueeY = useTransform(scrollYProgress, [0, 1], ["0vh", "32vh"]);

  const marqueeY = useSpring(isMobile ? mobileMarqueeY : desktopMarqueeY, {
    stiffness: 180,
    damping: 32,
    mass: 0.35,
  });

  const createMarquee = (items: string[]) =>
    [...items, ...items].map((item, index) => (
      <React.Fragment key={`${item}-${index}`}>
        <span>{item}</span>
        <motion.div
          className="flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          <Logo className="text-background [&_path]:stroke-background/50 block h-10.5 w-10.5 lg:h-15 lg:w-15" />
        </motion.div>
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
        className="sticky top-0 flex h-screen w-full items-center will-change-transform"
        style={{ y: marqueeY }}
      >
        <Marquee
          className="text-background font-sans text-[48px] font-medium tracking-[0.015em] lg:text-[64px]"
          options={{
            baseVelocity: 80,
            scrollBoost: false,
            gap: 20,
          }}
        >
          {createMarquee(items)}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default Contact;
