"use client";

import Logo from "@/images/logo.svg";

import { motion } from "motion/react";

import React from "react";
import Card from "@/ui/Card";
import Marquee from "@/animations/Marquee";

const items = [
  "I like trains",
  "Fueled by caffeine (obviously)",
  "Probably overthinking this",
  "Yes, this is intentional",
  "Wow, so subtle",
  "No, really—details matter",
];

const MoodMarquee = () => {
  const createMarquee = (items: string[]) =>
    [...items, ...items].map((item, index) => (
      <React.Fragment key={`${item}-${index}`}>
        <span>{item}</span>
        <Logo className="text-muted inline h-6 w-6 stroke-2" />
      </React.Fragment>
    ));

  return (
    <Card
      className="border-muted/10 col-span-3 row-span-2 xl:col-span-8 2xl:col-span-4"
      initial="initial"
      whileHover="hovered"
    >
      <Marquee
        className="text-muted font-mono text-3xl font-semibold tracking-tight italic"
        options={{ baseVelocity: 60 }}
      >
        {createMarquee(items)}
      </Marquee>
      <motion.div
        className="text-muted absolute top-1/2 left-[calc(100%+15px)] -translate-x-1/2 -translate-y-1/2 rotate-90 font-mono text-[0.625rem] font-bold tracking-wider whitespace-nowrap uppercase xl:hidden 2xl:block"
        variants={{ initial: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        Brr — train is coming
      </motion.div>
    </Card>
  );
};

export default MoodMarquee;
