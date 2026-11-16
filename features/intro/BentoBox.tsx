"use client";

import { motion } from "motion/react";
import CNTower from "./cards/CNTower";
import LightDark from "./cards/LightDark";
import MobileGallery from "./cards/MobileGallery";
import ImageSwap from "./cards/ImageSwap";
import EyesTracker from "./cards/EyesTracker";
import MoodMarquee from "./cards/MoodMarquee";
import MainShuffle from "./cards/MainShuffle";
import QQRLogo from "./cards/QQRLogo";
import BluewaveLogo from "./cards/BluewaveLogo";
import MobileReveal from "./cards/MobileReveal";

const BentoBox = () => {
  return (
    <motion.div
      className="bento-grid-cv mx relative grid h-335 auto-rows-fr grid-cols-9 gap-4 px-2 py-6 xl:h-235 xl:grid-cols-10 2xl:grid-cols-12"
      initial="initial"
      whileHover="hovered"
      variants={{
        initial: { opacity: 0.7, filter: "grayscale(1)" },
        hovered: { opacity: 1, filter: "grayscale(0)" },
      }}
      transition={{ duration: 0.6 }}
    >
      {/* <motion.div
        className="bento-overlay bg-background pointer-events-none absolute inset-0 z-1 mix-blend-color"
        variants={{ initial: { opacity: 1 }, hovered: { opacity: 0 } }}
        transition={{ duration: 0.6 }}
      /> */}
      <CNTower />
      <MainShuffle />
      <QQRLogo />
      <MobileReveal />
      <ImageSwap />
      <BluewaveLogo />
      <MobileGallery />
      <EyesTracker />
      <LightDark />
      <MoodMarquee />
    </motion.div>
  );
};

export default BentoBox;
