import React from "react";

import portrait from "@/images/nobg.webp";
import Name from "@/images/name.svg";

import Image from "next/image";
import TextFlip from "@/animations/TextFlip";
import LogoSpin from "@/animations/LogoSpin";

import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const MotionImage = motion.create(Image);

type HeroTextProps = { progress: MotionValue<number> };

type HeroTextAnimationProps = HeroTextProps & {
  isBootComplete: boolean;
};

const HeroText = React.memo(
  ({ progress, isBootComplete }: HeroTextAnimationProps) => {
    const ratio = useTransform(progress, [0.5, 0.65], [0, 100]);
    const spring = useSpring(ratio, { duration: 300 });
    const imageRatio = useTransform(progress, [0.5, 0.75], [1, 2]);

    // Text parallax
    const PADDING = 1.25;
    const yPos = useTransform(spring, (v) => `${v * PADDING}%`);
    const yNeg = useTransform(spring, (v) => `${-v * PADDING}%`);
    const yXtra = useTransform(spring, (v) => `${-v * PADDING * 2}%`);

    // Portrait effects
    const opacity = useTransform(imageRatio, [1, 2], [0.55, 0.9]);
    const scale = useTransform(imageRatio, [1, 2], [1, 1.1]);
    const maskImage = useMotionTemplate`radial-gradient(circle at center, rgba(0, 0, 0, ${opacity}) 0%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0) 75%)`;

    const TEXTSTYLE =
      "inline text-[124px] md:text-[148px] lg:text-[176px] leading-[85%] tracking-tighter [word-spacing:-2rem]";

    return (
      <div className="mx relative mt-auto flex items-center pt-12 uppercase md:my-auto md:justify-center md:pt-0">
        <div className="absolute z-10 flex w-min cursor-default flex-col gap-3 font-[450] text-nowrap whitespace-nowrap">
          <div className="flex justify-between gap-4 overflow-hidden font-mono">
            <motion.div
              className="flex origin-bottom-right"
              initial={{ y: "100%", scale: 0.8 }}
              animate={{
                y: isBootComplete ? "0%" : "100%",
                scale: isBootComplete ? 1 : 0.8,
              }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <motion.p style={{ y: yNeg }} className={TEXTSTYLE}>
                Heya
              </motion.p>
            </motion.div>
            <motion.div
              className="relative self-center"
              initial={{ y: "100%", scale: 0 }}
              animate={{
                y: isBootComplete ? "0%" : "100%",
                scale: isBootComplete ? 1 : 0,
              }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
            >
              <LogoSpin
                className="-translate-x-1/2 -translate-y-full md:absolute md:-translate-x-1/3 md:-translate-y-3/7"
                style={{ y: yXtra }}
              />
            </motion.div>
            <motion.div
              className="flex origin-bottom-left"
              initial={{ y: "100%", scale: 0.8 }}
              animate={{
                y: isBootComplete ? "0%" : "100%",
                scale: isBootComplete ? 1 : 0.8,
              }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            >
              <motion.p
                style={{ y: yNeg }}
                className={cn(TEXTSTYLE, "hidden md:inline")}
              >
                you
              </motion.p>
            </motion.div>
          </div>
          <div className="font-chakra hidden overflow-hidden md:block">
            <motion.div
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: isBootComplete ? "0%" : "100%" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
            >
              <motion.div
                style={{ y: yXtra }}
                className="text-muted-v2 flex justify-between gap-2 px-2 font-bold tracking-wider md:text-[0.8125rem] lg:text-[15px]"
              >
                <TextFlip>Frontend Developer</TextFlip>
                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute top-1/2 right-0 left-0 h-px">
                    <motion.div
                      className="via-muted-v2/60 absolute h-full w-25 bg-linear-to-r from-transparent to-transparent"
                      initial={{ left: -100 }}
                      animate={
                        isBootComplete
                          ? { left: [-100, "100%"] }
                          : { left: -100 }
                      }
                      transition={{
                        duration: 1.75,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 1.75,
                      }}
                      aria-hidden
                    />
                  </div>
                </div>
                <TextFlip>Daniel Cojocea</TextFlip>
              </motion.div>
            </motion.div>
          </div>
          <div className="flex flex-col justify-between gap-3 overflow-hidden font-mono md:flex-row md:gap-4">
            <div className="flex overflow-hidden">
              <motion.div
                className="flex origin-top-right"
                initial={{ y: "100%", scale: 0.8 }}
                animate={{
                  y: isBootComplete ? "0%" : "100%",
                  scale: isBootComplete ? 1 : 0.8,
                }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
              >
                <motion.div
                  className="pl-1.75 md:self-center md:pl-2.5"
                  style={{ y: yPos }}
                >
                  <Name className="h-23 w-auto md:h-27 lg:h-32" fill="none" />
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              className="flex origin-top-left"
              initial={{ y: "100%", scale: 0.8 }}
              animate={{
                y: isBootComplete ? "0%" : "100%",
                scale: isBootComplete ? 1 : 0.8,
              }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
            >
              <motion.p style={{ y: yPos }} className={TEXTSTYLE}>
                here
              </motion.p>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="pointer-events-none relative ml-auto size-auto translate-x-1/2 md:mx-auto md:translate-none"
          initial={{ scale: 0.8 }}
          animate={{ scale: isBootComplete ? 1 : 0.8 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <MotionImage
            className="isolate h-auto w-100 mask-cover drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] select-none md:w-160"
            style={{ maskImage, WebkitMaskImage: maskImage, scale }}
            src={portrait}
            alt="portrait"
            width={600}
            height={636}
            preload={true}
            // fetchPriority="high"
            sizes="(max-width: 768px) 40vw, (max-width: 1280px) 50vw, auto"
            draggable={false}
          />
        </motion.div>
      </div>
    );
  },
);

HeroText.displayName = "HeroText";

export default HeroText;
