"use client";

import Logo from "@/images/logo.svg";

import { motion } from "motion/react";
import { useRef, useState } from "react";

const MotionLogo = motion.create(Logo);

const AnimatedLogo = ({ onClick }: { onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => setPosition({ x: 0, y: 0 });
  const { x, y } = position;

  return (
    <motion.div
      className="[pointer-events:all] relative mt-6 h-min justify-self-center"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      initial="initial"
      whileHover="hovered"
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.4 }}
    >
      <a
        href="#hero"
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          if (onClick) onClick();
        }}
      >
        <MotionLogo
          className="h-12 w-auto"
          variants={{
            initial: { scale: 1, color: "var(--color-foreground)" },
            hovered: { scale: 0.6, color: "var(--color-background)" },
          }}
        />
        <motion.div
          className="bg-accent absolute inset-1/2 -z-1 h-[110%] w-full origin-center -translate-x-1/2 -translate-y-1/2"
          variants={{
            initial: {
              scale: 0,
              borderRadius: "100%",
              pointerEvents: "none",
            },
            hovered: {
              scale: 1,
              borderRadius: "25%",
              pointerEvents: "auto",
            },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </a>
    </motion.div>
  );
};

export default AnimatedLogo;
