import Card from "@/ui/Card";
import Image from "next/image";

import dashboard from "@/images/quickQR/accounting-short.png";
import dashboardDark from "@/images/quickQR/accounting-dark-short.png";

import { CaretRightIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useState } from "react";

const r2Url = process.env.NEXT_PUBLIC_QUICKQR;
const CLIP_TRANSITION = { duration: 0.75, ease: "easeInOut" } as const;
const CARET_TRANSITION = {
  duration: 2.125,
  repeatDelay: 0.375,
  repeat: Infinity,
  ease: [0.45, 0, 0.55, 1],
} as const;

type CaretProps = {
  show: boolean;
  className?: string;
  onHover?: () => void;
};

const Caret = ({ show, className, onHover }: CaretProps) => (
  <motion.div
    aria-hidden="true"
    className={`absolute top-1/2 z-10 -translate-y-1/2 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: show ? 1 : 0 }}
    transition={{ duration: 0.75, ease: "easeOut" }}
    onHoverStart={onHover}
  >
    <motion.div
      initial={{ translateX: 0, opacity: 0 }}
      animate={{ translateX: [0, 10, 0], opacity: [0, 1, 0] }}
      transition={{
        translateX: CARET_TRANSITION,
        opacity: CARET_TRANSITION,
      }}
    >
      <CaretRightIcon className="h-6 w-6 drop-shadow-lg" weight="bold" />
    </motion.div>
  </motion.div>
);

const LightDark = () => {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  // Calculate clip percentages: default 50/50, hovered side gets 100%
  const leftClip = hovered === "left" ? 100 : hovered === "right" ? 0 : 50;
  const rightClip = hovered === "right" ? 100 : hovered === "left" ? 0 : 50;

  return (
    <Card
      className="col-span-4 row-span-4 overflow-hidden"
      onHoverEnd={() => setHovered(null)}
    >
      <Caret
        show={hovered === "left"}
        className="text-foreground/70 right-0 -scale-x-100"
        onHover={() => setHovered("right")}
      />
      <Caret
        show={hovered === "right"}
        className="text-background/70 left-0"
        onHover={() => setHovered("left")}
      />
      <motion.div
        className="absolute inset-0"
        onHoverStart={() => setHovered("left")}
        animate={{ clipPath: `inset(0 ${100 - leftClip}% 0 0)` }}
        transition={CLIP_TRANSITION}
      >
        <div className="absolute inset-0 bg-linear-[90deg,#442f82,#422f7f,#352c68,#212137,#1b1b21,#1a1a1e_45%]" />
        <div className="absolute bottom-0 left-1/2 h-[115%] w-min -translate-x-1/2 translate-y-1/4">
          <Image
            src={`${r2Url}/accounting.png`}
            alt="quickQR Accounting Dashboard"
            width={1440}
            height={930}
            className="pointer-events-none h-full w-auto max-w-none object-contain select-none"
          />
          <div className="bg-foreground/20 absolute -inset-1.5 -z-1 w-auto rounded-lg" />
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0"
        onHoverStart={() => setHovered("right")}
        animate={{ clipPath: `inset(0 0 0 ${100 - rightClip}%)` }}
        transition={CLIP_TRANSITION}
      >
        <div className="absolute inset-0 bg-linear-[90deg,#f2f3f0_40%,#c3dcc9,#84c7ba,#36aec0,#0090cd,#2a6acb]" />
        <div className="absolute bottom-0 left-1/2 h-[115%] w-min -translate-x-1/2 translate-y-1/4">
          <Image
            src={`${r2Url}/accounting-dark.png`}
            alt="quickQR Accounting Dashboard Dark Mode"
            width={1440}
            height={930}
            className="pointer-events-none h-full w-auto max-w-none object-contain select-none"
          />
          <div className="bg-background/30 absolute -inset-1 -z-1 w-auto rounded-lg" />
        </div>
      </motion.div>
    </Card>
  );
};

export default LightDark;
