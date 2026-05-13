import TextParallax from "@/animations/TextParallax";
import r48Mask from "@/images/r48.svg?url";

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
  const [isMaskEnabled, setIsMaskEnabled] = useState(false);
  const maskEnabledRef = useRef(false);

  useMotionValueEvent(progress, "change", (value) => {
    const nextEnabled = value >= 0.5;
    if (nextEnabled !== maskEnabledRef.current) {
      maskEnabledRef.current = nextEnabled;
      setIsMaskEnabled(nextEnabled);
    }
  });

  const blockRows = useMemo(
    () =>
      Array.from({ length: ROW_COUNT }, () =>
        shuffle(Array.from({ length: BLOCK_COUNT }, (_, i) => i)),
      ),
    [],
  );

  const getBlocks = (row: number, blocks: number[]) => {
    return blocks.map((block) => {
      // Each block gets a random delay between 0 and 1
      const delay = getRandom(row, block);
      // Animation window for each block within progress 0-1
      const animStart = 0 + delay * 0.5 * 1; // 0.7 = how much of 0-1 is used for staggering
      const animEnd = animStart + 0.5 * 0.3; // 0.3 = duration of fade for each block

      return (
        <div key={`${row}-${block}`}>
          <ScreenBlock
            progress={progress}
            animStart={animStart}
            animEnd={animEnd}
          />
        </div>
      );
    });
  };

  return (
    <div
      id="screen"
      className="bg-background border-background-v2 relative z-0 h-screen min-w-screen w-auto aspect-video overflow-hidden"
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
      <div className="grid h-full grid-cols-12 grid-rows-12">
        {blockRows.map((blocks, row) => getBlocks(row, blocks))}
      </div>
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
      <div className="text-background absolute inset-0 col-span-full">
        <TextParallax
          className="text-background text-8xl"
          items={[
            "Start a Conversation",
            "Hola, Let's Talk Ideas",
            "Connect With Me",
            "Bonjour, say it back!",
            "I'd Love to Hear From You",
            "Reach Out Anytime",
            "やあ！話そうよ！",
          ]}
          options={{
            baseVelocity: 60,
            direction: "left",
            changeDirection: false,
            dividerClassName: "text-background h-18 w-18 stroke-2",
            gap: 32,
          }}
        />
      </div>
    </div>
  );
};

export default Screen;
