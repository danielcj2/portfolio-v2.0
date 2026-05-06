import React from "react";
import TextFlip from "@/animations/TextFlip";
import { motion, useTransform, type MotionValue } from "motion/react";

type ScrollIndicatorProps = {
  progress: MotionValue<number>;
  onClick: () => void;
};

const ScrollIndicator = React.memo(
  ({ progress, onClick }: ScrollIndicatorProps) => {
    const opacity = useTransform(progress, [0.5, 0.8], [1, 0]);

    return (
      <motion.a
        className="text-muted-v2 font-chakra block w-min cursor-pointer! py-1.5 text-xs font-bold tracking-widest italic"
        style={{ opacity }}
        href="#intro"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <TextFlip>scroll to discover &#8595;</TextFlip>
      </motion.a>
    );
  },
);

ScrollIndicator.displayName = "ScrollIndicator";

export default ScrollIndicator;
