"use client";

import React from "react";
import Marquee from "@/animations/Marquee";
import TVStage from "@/components/tv/TVStage";

import { motion } from "framer-motion";

const items = ["Not Found", "Page Missing", "Oops!"];

export default function NotFound() {
  const createMarquee = (items: string[]) =>
    [...items, ...items].map((item, index) => (
      <React.Fragment key={`${item}-${index}`}>
        <span>{item}</span>
        <span className="text-background font-sans text-[68px] font-medium tracking-[0.015em] italic">
          <span className="mx-6">&#8226;</span>
          404
          <span className="mx-6">&#8226;</span>
        </span>
      </React.Fragment>
    ));

  return (
    <div className="h-screen">
      <div className="relative flex h-[40vh] items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-[#c4c4c4]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1.2 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <TVStage fastForward />
        <Marquee
          className="text-background -mt-12 font-sans text-[64px] font-medium tracking-[0.015em]"
          options={{
            baseVelocity: 90,
            scrollBoost: false,
            gap: 24,
          }}
        >
          {createMarquee(items)}
        </Marquee>
      </div>
    </div>
  );
}
