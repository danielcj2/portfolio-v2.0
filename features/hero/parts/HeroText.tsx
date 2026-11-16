import React from "react";

import portrait from "@/images/nobg.webp";
import Name from "@/images/name.svg";

import Image from "next/image";
import TextScramble from "@/animations/TextScramble";
import LogoSpin from "@/animations/LogoSpin";

import { cn } from "@/lib/utils";
import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "motion/react";

const MotionImage = motion.create(Image);

type HeroTextProps = { progress: MotionValue<number> };

const HeroText = React.memo(({ progress }: HeroTextProps) => {
  const ratio = useTransform(progress, [0.5, 0.65], [0, 100]);
  const spring = useSpring(ratio, { duration: 100 });
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
    "inline font-sans text-[120px] md:text-[148px] lg:text-[176px] leading-[0.95] [word-spacing:-2rem]";

  return (
    <div className="mx relative my-auto flex items-center pt-12 uppercase md:my-auto md:justify-center md:pt-0">
      <div className="absolute z-10 flex w-min cursor-default flex-col gap-2 text-nowrap whitespace-nowrap">
        <div className="flex justify-between gap-4 overflow-hidden">
          <motion.div
            className="flex origin-bottom-right"
            initial={{ y: "100%", scale: 0.8 }}
            animate={{ y: "0%", scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.p style={{ y: yNeg }} className={TEXTSTYLE}>
              Heya
            </motion.p>
          </motion.div>
          <motion.div
            className="relative self-center"
            initial={{ y: "100%", scale: 0 }}
            animate={{ y: "0%", scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
          >
            <LogoSpin
              className="-translate-x-2/3 -translate-y-full md:absolute md:-translate-x-1/3 md:-translate-y-3/7"
              style={{ y: yXtra }}
            />
          </motion.div>
          <motion.div
            className="flex origin-bottom-left"
            initial={{ y: "100%", scale: 0.8 }}
            animate={{ y: "0%", scale: 1 }}
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
        <div className="hidden overflow-hidden md:block">
          <motion.div
            className="block"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
          >
            <motion.div
              style={{ y: yXtra }}
              className="text-muted flex justify-between gap-2 pr-2.25 pl-1.5 font-mono font-semibold md:text-[0.8125rem] lg:text-[15px] xl:text-base"
            >
              <TextScramble text="Frontend Developer" />
              <div className="relative flex-1 overflow-hidden">
                <div className="absolute top-1/2 right-0 left-0 h-px">
                  <motion.div
                    className="via-muted/90 absolute h-full w-25 bg-linear-to-r from-transparent to-transparent"
                    initial={{ left: -100 }}
                    animate={{ left: [-100, "100%"] }}
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
              <TextScramble text="Daniel Cojocea" />
            </motion.div>
          </motion.div>
        </div>
        <div className="flex flex-col justify-between gap-2 overflow-hidden md:mt-1.5 md:flex-row md:gap-8">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex origin-top-right"
              initial={{ y: "100%", scale: 0.8 }}
              animate={{ y: "0%", scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
            >
              <motion.div
                className="pb-1.25 pl-1.25 md:self-center"
                style={{ y: yPos }}
              >
                <Name
                  className="h-23 w-auto md:h-27 lg:h-32 xl:h-35"
                  fill="none"
                />
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="flex origin-top-left"
            initial={{ y: "100%", scale: 0.8 }}
            animate={{ y: "0%", scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
          >
            <motion.p style={{ y: yPos }} className={TEXTSTYLE}>
              here
            </motion.p>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="pointer-events-none relative ml-auto size-auto translate-x-1/2 select-none md:mx-auto md:translate-none"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
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
          fetchPriority="high"
          sizes="(max-width: 768px) 40vw, (max-width: 1280px) 50vw, auto"
          draggable={false}
        />
      </motion.div>
    </div>
  );
});

HeroText.displayName = "HeroText";

export default HeroText;
