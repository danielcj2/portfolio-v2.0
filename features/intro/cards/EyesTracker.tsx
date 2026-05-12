"use client";

import Card from "@/ui/Card";
import {
  useSpring,
  motion,
  useTransform,
  useInView,
  MotionValue,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

type TextState = "idle" | "reveal1" | "reveal2" | "reveal3";
type EyeProps = { mouseX: MotionValue<number>; mouseY: MotionValue<number> };

const Eye = ({ mouseX, mouseY }: EyeProps) => {
  const x = useTransform(mouseX, (v) => v - 8); // -8 for centering (w-4 = 16px / 2)
  const y = useTransform(mouseY, (v) => v - 12); // -12 for centering (h-6 = 24px / 2)

  return (
    <div className="bg-muted/35 ring-muted/20 relative h-8 w-6 overflow-hidden rounded-[50%] border-none ring-1 ring-inset">
      <motion.div
        className="bg-background absolute top-1/2 left-1/2 h-6 w-4 rounded-[50%]"
        style={{ x, y }}
      >
        <div className="bg-foreground/80 absolute top-1 right-1/2 h-1 w-1 translate-x-1/2 rounded-full" />
      </motion.div>
      <motion.div
        className="border-b-muted/20 absolute left-1/2 h-full w-[200%] -translate-x-1/2 rounded-b-[50%] border-b bg-neutral-900"
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.45, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 15,
        }}
      />
    </div>
  );
};

const SPRING = { stiffness: 300, damping: 30 };
const MAX_MOVE = 8; // pixels
const PAUSE_DURATION = 1500; // time to read
const TRANSITION = { duration: 0.3, ease: [0.65, 0, 0.35, 1] as const };
const NEXT_STAGE: Record<TextState, TextState> = {
  idle: "reveal1",
  reveal1: "reveal2",
  reveal2: "reveal3",
  reveal3: "reveal1",
};

type TextSlide = {
  text: string;
  variants: Variants;
};

const textSlides: TextSlide[] = [
  {
    text: "See what's here",
    variants: {
      idle: { y: "0%" },
      reveal1: { y: "-100%" },
      reveal2: { y: "-200%" },
      reveal3: { y: "-300%" },
    },
  },
  {
    text: "Tiny glimpses...",
    variants: {
      idle: { opacity: 0, y: "100%" },
      reveal1: { opacity: 1, y: "0%" },
      reveal2: { opacity: 0, y: "-100%" },
      reveal3: { opacity: 0, y: "-200%" },
    },
  },
  {
    text: "...of bigger ideas...",
    variants: {
      idle: { opacity: 0, y: "200%" },
      reveal1: { opacity: 0, y: "100%" },
      reveal2: { opacity: 1, y: "0%" },
      reveal3: { opacity: 0, y: "-100%" },
    },
  },
  {
    text: "...ready for exploration.",
    variants: {
      idle: { opacity: 0, y: "300%" },
      reveal1: { opacity: 0, y: "200%" },
      reveal2: { opacity: 0, y: "100%" },
      reveal3: { opacity: 1, y: "0%" },
    },
  },
];

const EyesTracker = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, SPRING);
  const mouseY = useSpring(0, SPRING);
  const [stage, setStage] = useState<TextState>("idle");
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInView = useInView(containerRef, { amount: 0.15 });

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isHovered) {
      clearTimer();
      setStage("idle");
      return;
    }

    if (stage === "idle") {
      setStage("reveal1");
      return clearTimer;
    }

    timerRef.current = setTimeout(
      () => setStage(NEXT_STAGE[stage]),
      PAUSE_DURATION,
    );

    return clearTimer;
  }, [stage, isHovered, clearTimer]);

  useEffect(() => {
    if (!isInView) return;

    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate direction and normalize
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        // Normalize and scale to MAX_MOVE
        mouseX.set((dx / distance) * Math.min(distance / 50, 1) * MAX_MOVE);
        mouseY.set((dy / distance) * Math.min(distance / 50, 1) * MAX_MOVE);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isInView, mouseX, mouseY]);

  return (
    <Card
      className="border-muted/10 col-start-4 col-end-7 row-start-9 row-end-13 overflow-hidden xl:col-start-3 xl:col-end-5"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        className="font-chakra absolute inset-0 flex flex-col items-center justify-center gap-5 text-sm font-medium"
      >
        <div className="flex gap-1.25" aria-hidden="true">
          <Eye mouseX={mouseX} mouseY={mouseY} />
          <Eye mouseX={mouseX} mouseY={mouseY} />
        </div>
        <div className="relative block h-5 w-full overflow-hidden whitespace-nowrap select-none">
          {textSlides.map(({ text, variants }) => (
            <motion.div
              key={text}
              className="absolute inset-0 flex items-center justify-center"
              animate={stage}
              variants={variants}
              transition={TRANSITION}
            >
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};
export default EyesTracker;
