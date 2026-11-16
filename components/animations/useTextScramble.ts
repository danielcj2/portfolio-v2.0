"use client";

import { animate, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

const CHARS = "!@#$%^&*():{};|,.<>/?0123456789";
const SCRAMBLE_TIME_PER_CHARACTER = 0.08;

export const useTextScramble = (text: string) => {
  const letters = Array.from(text);
  const progress = useMotionValue(1);
  const animation = useRef<{ stop: () => void } | null>(null);
  const isAnimating = useRef(false);
  const scrambledText = useRef(text);
  const [displayText, setDisplayText] = useState(text);

  const getText = (phase: number) => {
    const fillEnd = 0.58;
    const resolveStart = 0.4;
    const fillCount = Math.floor(Math.min(1, phase / fillEnd) * letters.length);
    const resolvedCount =
      phase <= resolveStart
        ? 0
        : Math.floor(
            ((phase - resolveStart) / (1 - resolveStart)) * letters.length,
          );

    return letters
      .map((letter, index) => {
        if (letter === " " || index >= fillCount) return " ";
        if (index < resolvedCount) return letter;
        return scrambledText.current[index];
      })
      .join("");
  };

  useEffect(() => {
    animation.current?.stop();
    animation.current = null;
    isAnimating.current = false;
    progress.set(1);
    setDisplayText(text);
  }, [text, progress]);

  useEffect(
    () => () => {
      animation.current?.stop();
    },
    [],
  );

  const scramble = () => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    scrambledText.current = letters
      .map((letter) =>
        letter === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)],
      )
      .join("");
    progress.set(0);
    setDisplayText(getText(0));
    animation.current = animate(progress, 1, {
      duration: Math.min(0.6, letters.length * SCRAMBLE_TIME_PER_CHARACTER),
      ease: "linear",
      onUpdate: (value) => setDisplayText(getText(value)),
      onComplete: () => {
        isAnimating.current = false;
        animation.current = null;
        setDisplayText(text);
      },
    });
  };

  return { displayText, scramble };
};
