import React from "react";

import portrait from "@/images/nobg.png";
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

const MotionImage = motion.create(Image);

type HeroTextProps = { progress: MotionValue<number> };

const HeroText = React.memo(({ progress }: HeroTextProps) => {
  const ratio = useTransform(progress, [0.5, 0.65], [0, 100]);
  const spring = useSpring(ratio, { duration: 300 });
  const imageRatio = useTransform(progress, [0.5, 0.75], [1, 2]);

  // Text parallax
  const PADDING = 1.25;
  const yPos = useTransform(spring, (v) => `${v * PADDING}%`);
  const yNeg = useTransform(spring, (v) => `${-v * PADDING}%`);
  const yXtra = useTransform(spring, (v) => `${-v * PADDING * 2}%`);

  // Portrait effects
  const opacity = useTransform(imageRatio, [1, 2], [0.55, 0.95]);
  const scale = useTransform(imageRatio, [1, 2], [1, 1.1]);
  const maskImage = useMotionTemplate`radial-gradient(circle at center, rgba(0, 0, 0, ${opacity}) 0%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0) 75%)`;

  const TEXTSTYLE =
    "inline text-[176px] leading-[85%] tracking-tighter [word-spacing:-2rem] ";

  return (
    <div className="relative my-auto flex items-center justify-center uppercase">
      <div className="absolute z-10 flex w-min cursor-default flex-col gap-3 overflow-hidden font-[450] text-nowrap whitespace-nowrap">
        <div className="flex justify-between gap-4 overflow-hidden font-mono">
          <motion.p style={{ y: yNeg }} className={TEXTSTYLE}>
            Heya
          </motion.p>
          <LogoSpin
            className="absolute -translate-x-1/3 -translate-y-3/7"
            style={{ y: yXtra }}
          />
          <motion.p style={{ y: yNeg }} className={TEXTSTYLE}>
            you
          </motion.p>
        </div>
        <div className="font-chakra overflow-hidden">
          <motion.div
            style={{ y: yXtra }}
            className="text-muted-v2 flex justify-between gap-2 px-2 text-sm font-bold tracking-wider"
          >
            <TextFlip>Frontend Developer</TextFlip>
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute top-1/2 right-0 left-0 h-px">
                <motion.div
                  className="via-muted-v2/60 absolute h-full w-25 bg-linear-to-r from-transparent to-transparent"
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
            <TextFlip>Daniel Cojocea</TextFlip>
          </motion.div>
        </div>
        <div className="flex justify-between gap-4 overflow-hidden font-mono">
          <motion.div className="self-center pl-2.5" style={{ y: yPos }}>
            <Name className="h-32 w-auto" fill="none" />
          </motion.div>
          <motion.p style={{ y: yPos }} className={TEXTSTYLE}>
            here
          </motion.p>
        </div>
      </div>
      <MotionImage
        className="fade-mask pointer-events-none relative isolate mx-auto h-auto w-auto mask-cover drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] select-none"
        style={{ maskImage, WebkitMaskImage: maskImage, scale }}
        src={portrait}
        alt="portrait"
        width={600}
        height={600}
        priority
        draggable={false}
      />
    </div>
  );
});

HeroText.displayName = "HeroText";

export default HeroText;
