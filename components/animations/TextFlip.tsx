"use client";

import { cn } from "@/lib/utils";

const TextFlip = ({ children }: { children: string }) => {
  const DURATION_MS = 275;
  const STAGGER_MS = 27.5;
  const letters = Array.from(children);

  const getDelay = (index: number) => `${index * STAGGER_MS}ms`;

  const commonClass =
    "inline-block transform-gpu transition-transform ease-in-out motion-reduce:transition-none";

  const renderLine = (
    className: string,
    keyPrefix: string,
  ) =>
    letters.map((letter, i) => (
      <span
        className={cn(commonClass, className)}
        style={{
          transitionDuration: `${DURATION_MS}ms`,
          transitionDelay: getDelay(i),
        }}
        key={`${keyPrefix}-${i}-${letter}`}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));

  return (
    <div className="group relative block overflow-hidden whitespace-nowrap">
      <p className="cursor-inherit">
        {renderLine(
          "translate-y-0 group-hover:-translate-y-full motion-reduce:group-hover:translate-y-0",
          "top",
        )}
      </p>
      <p className="cursor-inherit absolute inset-0">
        {renderLine(
          "translate-y-full group-hover:translate-y-0 motion-reduce:group-hover:translate-y-full",
          "bottom",
        )}
      </p>
    </div>
  );
};

export default TextFlip;
