"use client";

import Card from "@/ui/Card";
import Gradient from "@/images/gradient.svg";

import { motion } from "motion/react";

/* TODO [] FINISH ANIMATION */

const ZoomGradient = () => {
  return (
    <Card
      className="group border-muted/10 col-span-2 row-span-6 hidden overflow-hidden 2xl:block"
      whileHover="hovered"
      initial="initial"
    >
      <Gradient className="pointer-events-none absolute h-auto w-full select-none" />
      <div className="flex h-full w-full origin-bottom justify-center p-2">
        <motion.div
          className="bg-background z-1 rounded-3xl"
          layout
          variants={{
            initial: { width: "80px", height: "20px" },
            hovered: { width: "100%", height: "100px" },
          }}
          transition={{ duration: 0.375 }}
        ></motion.div>
      </div>
    </Card>
  );
};

export default ZoomGradient;
