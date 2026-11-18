import RowFade from "@/components/animations/RowFade";
import TextMarquee from "@/components/animations/Marquee";
import r48Mask from "@/images/r48.svg?url";
import { useMediaQuery } from "@/providers/MediaQueryContext";

import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMemo, useRef, useState } from "react";

type ScreenProps = { progress: MotionValue<number> };
type ScreenBlockProps = {
  progress: MotionValue<number>;
  animStart: number;
  animEnd: number;
};

const ROW_COUNT = 12;
const BLOCK_COUNT = 12;

// NOTE: Shuffles array in place (Fisher–Yates shuffle)
export function shuffle<T>(array: T[]) {
  let currentIndex = array.length - 1;

  for (; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    const currentValue = array[currentIndex];

    array[currentIndex] = array[randomIndex];
    array[randomIndex] = currentValue;
  }

  return array;
}

export const getRandom = (row: number, block: number) => {
  const seed = row * 100 + block;
  return (Math.sin(seed) + 1) / 2;
};

const ScreenBlock = ({ progress, animStart, animEnd }: ScreenBlockProps) => {
  const blockOpacity = useTransform(progress, [animStart, animEnd], [0, 1]);

  return (
    <motion.div
      className="bg-foreground/75 h-full w-full"
      style={{ opacity: blockOpacity }}
    />
  );
};

const Screen = ({ progress }: ScreenProps) => {
  const opacity = useTransform(progress, [0.5, 1], [0, 1]);
  const blockRows = useTransform(progress, [0, 0.5], [0, 1]);
  const { isMobile } = useMediaQuery();
  const [isMaskEnabled, setIsMaskEnabled] = useState(false);
  const maskEnabledRef = useRef(false);
  const parallaxItems = useMemo(
    () => [
      "Start a Conversation",
      "Hola, Let's Talk Ideas",
      "Connect With Me",
      "Bonjour, say it back!",
      "I'd Love to Hear From You",
      "Reach Out Anytime",
      "やあ！話そうよ！",
    ],
    [],
  );

  useMotionValueEvent(progress, "change", (value) => {
    const nextEnabled = value >= 0.5;
    if (nextEnabled !== maskEnabledRef.current) {
      maskEnabledRef.current = nextEnabled;
      setIsMaskEnabled(nextEnabled);
    }
  });

  return (
    <div
      id="screen"
      className="bg-background border-background-v2 relative z-0 aspect-video h-screen w-auto min-w-screen overflow-hidden"
      style={{
        maskImage: isMaskEnabled ? `url(${r48Mask})` : "none",
        WebkitMaskImage: isMaskEnabled ? `url(${r48Mask})` : "none",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }}
    >
      <RowFade
        className="h-screen w-full"
        color="foreground/75"
        count={8}
        progress={blockRows}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[48px]"
        aria-hidden
        style={{
          opacity,
          background:
            "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.5), transparent 40%)",
          boxShadow: `inset -20px -20px 100px 10px #5c5c5c, 
                      inset 40px 40px 100px #5c5c5c,
                      inset 12px 12px 12px #1a1a1a`,
        }}
      />
      {/* <div className="text-background absolute inset-0 col-span-full">
        <TextMarquee
          className="text-background text-8xl"
          items={parallaxItems}
          options={{
            baseVelocity: 60,
            direction: "left",
            changeDirection: false,
            dividerClassName: "text-background h-18 w-18 stroke-2",
            gap: 32,
          }}
        />
      </div> */}
    </div>
  );
};

export default Screen;
