import r48Mask from "@/images/r48.svg?url";
import { motion, MotionValue, useTransform } from "motion/react";

const TVShell = ({
  progress,
  children,
}: {
  progress: MotionValue;
  children?: React.ReactNode;
}) => {
  const radius = useTransform(progress, [0, 0.05], [0, 36]);

  return (
    <>
      <div
        id="tv"
        aria-hidden="true"
        className="absolute top-[calc(50%+92px)] left-1/2 z-101 h-min w-auto -translate-x-1/2 -translate-y-1/2 rounded-[96px] p-18 pb-64"
      >
        <div className="h-auto w-auto px-12 py-14">
          <div className="h-screen w-screen" />
        </div>
      </div>
      <div
        id="tv-shell"
        className="absolute top-[calc(50%+92px)] left-1/2 z-102 h-min w-auto -translate-x-1/2 -translate-y-1/2 rounded-[96px] bg-[#7A7A7A] p-18 pb-64"
        style={{
          maskImage: `linear-gradient(#fff 0 0), url(${r48Mask})`,
          WebkitMaskImage: `linear-gradient(#fff 0 0), url(${r48Mask})`,
          maskPosition: "0 0, 120px 128px",
          WebkitMaskPosition: "0 0, 120px 128px",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "100% 100%, 100vw 100vh",
          WebkitMaskSize: "100% 100%, 100vw 100vh",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      >
        <div
          className="h-auto w-auto rounded-[64px] bg-[#545454]/80 px-12 py-14"
          style={{
            boxShadow:
              "inset 8px 8px 15px #4a4a4a, inset -55px -55px 15px #8c8c8c",
          }}
        >
          <motion.div
            className="bg-background-v2 relative z-1 h-screen w-screen rounded-[36px]"
            style={{ borderRadius: radius }}
          />
        </div>
        {children}
      </div>
    </>
  );
};

export default TVShell;
