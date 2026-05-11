"use client";

import Asterisk from "@/images/asterisk.svg";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { useId } from "react";

type LogoSpinProps = { text?: string } & HTMLMotionProps<"div">;

const LogoSpin = ({ text, ...props }: LogoSpinProps) => {
  const reduceMotion = useReducedMotion();
  const circlePathId = `circle-${useId().replace(/:/g, "")}`;

  return (
    <div
      className="group relative self-center"
      aria-hidden="true"
      role="presentation"
    >
      <motion.div {...props}>
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{
            rotate: { duration: 12, ease: "linear", repeat: Infinity },
          }}
        >
          <div className="transition-scale duration-300 ease-in-out md:group-hover:scale-65">
            <Asterisk className="[&_path]:md:group-hover:fill-foreground h-8 md:h-14 w-auto [&_path]:transition-colors [&_path]:duration-300" />
          </div>
        </motion.div>
        <div className="center-xy -z-1 size-16">
          <motion.svg
            className="size-full opacity-0 transition-opacity duration-300 ease-in-out md:group-hover:opacity-100"
            viewBox="0 0 100 100"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            <path
              fill="none"
              id={circlePathId}
              d="M50 50 m-40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
            <text className="fill-foreground font-chakra stroke-0 text-[12px] font-medium tracking-wider">
              <textPath href={`#${circlePathId}`}>
                {text ? text : "Hi stranger ✦ scroll to discover ✦"}
              </textPath>
            </text>
          </motion.svg>
        </div>
      </motion.div>
    </div>
  );
};

export default LogoSpin;
