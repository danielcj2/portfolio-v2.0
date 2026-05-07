"use client";

import { motion } from "motion/react";
import CNTower from "./cards/CNTower";
import LightDark from "./cards/LightDark";
import MobileScroller from "./cards/MobileScroller";
import ImageSwap from "./cards/ImageSwap";
import EyesTracker from "./cards/EyesTracker";
import ZoomGradient from "./cards/ZoomGradient";
import MoodParallax from "./cards/MoodParallax";
import MainShuffle from "./cards/MainShuffle";
import QQRLogo from "./cards/QQRLogo";
import BluewaveLogo from "./cards/BluewaveLogo";

const BentoBox = () => {
  return (
    <motion.div
      className="mx grid h-235 grid-cols-12 grid-rows-12 gap-4 px-2 py-6 will-change-[filter]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 940px" }}
      initial={{ opacity: 0.7, filter: "grayscale(100%)" }}
      whileHover={{ opacity: 1, filter: "grayscale(0%)" }}
      transition={{ duration: 0.6 }}
    >
      <CNTower />
      <MainShuffle />
      <QQRLogo />
      <ZoomGradient />
      <ImageSwap />
      <BluewaveLogo />
      <MobileScroller />
      <EyesTracker />
      <LightDark />
      <MoodParallax />
    </motion.div>
  );
};

export default BentoBox;
