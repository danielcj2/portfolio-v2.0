import Screen from "./Screen";
import TVButtons from "./TVButtons";

import { motion, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

// *** 0 -> 1 = blocks fade in ***
// *** 0.5 -> 1 = tv scales up ***
// *** 0.75 -> 1 = origin shifts to center ***

type TVProps = {
  progress: MotionValue<number>;
};

const TV = ({ progress }: TVProps) => {
  const tv = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const [originY, setOriginY] = useState<string>("-50%");

  useEffect(() => {
    const updateOrigin = () => {
      if (!tv.current || !cover.current) return;

      const tvRect = tv.current.getBoundingClientRect();
      if (tvRect.height <= 0) return;

      const screenRect = cover.current.getBoundingClientRect();
      const nextOriginY =
        ((screenRect.top + screenRect.height / 2 - tvRect.top + 1) /
          tvRect.height) *
        100;

      setOriginY(`-${nextOriginY}%`);
    };

    const observer = new ResizeObserver(updateOrigin);
    if (tv.current) observer.observe(tv.current);
    if (cover.current) observer.observe(cover.current);

    const onWindowResize = () => updateOrigin();
    window.addEventListener("resize", onWindowResize);

    const rafId = window.requestAnimationFrame(updateOrigin);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onWindowResize);
      observer.disconnect();
    };
  }, []);

  const scale = useTransform(progress, [0.5, 1], [1, 0.4]);
  const y = useTransform(progress, [0.75, 1], [originY, "-50%"]);

  return (
    <div className="pointer-events-none sticky top-0 h-screen w-full z-11">
      <motion.div
        id="tv"
        ref={tv}
        className="bg-[#7A7A7A] absolute top-1/2 left-1/2 aspect-14/9 h-min w-auto origin-center overflow-clip rounded-[100px] p-20 pb-64 will-change-transform"
        style={{ scale, x: "-50%", y }}
      >
        <div
          className="bg-muted-v2/80 h-auto w-auto rounded-[56px] px-14 py-15"
          style={{
            boxShadow:
              "inset 8px 8px 15px #4a4a4a, inset -55px -55px 15px #8c8c8c",
          }}
        >
          <div
            className="bg-background-v2 relative z-1 h-auto w-auto rounded-[36px] p-2"
            ref={cover}
          >
            <Screen progress={progress} />
          </div>
        </div>
        <TVButtons />
      </motion.div>
    </div>
  );
};

export default TV;
