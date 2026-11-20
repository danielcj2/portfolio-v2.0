import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useTextScramble } from "@/animations/useTextScramble";
import {
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

type TableProps = {
  title: string;
  caption: string;
  rows: Row[];
};

type Row = {
  className?: string;
  revealText: string;
  title: string;
  caption?: string;
};

const Row = ({ className, title, caption, revealText }: Row) => {
  const { displayText: scrambledText, scramble } = useTextScramble(revealText);

  return (
    <motion.div
      className={cn(
        "text-muted relative grid grid-cols-4 items-baseline overflow-hidden px-3 py-1.75 text-lg font-medium select-none md:px-5 md:py-2.75 md:text-[25px]",
        className,
      )}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
      onHoverStart={scramble}
      onTapStart={scramble}
    >
      <div className="col-span-3 md:tracking-[-0.015em]">{title}</div>
      <div className="text-end text-[17px] md:text-[21px]">{caption}</div>
      <span className="sr-only">{revealText}</span>
      <motion.div
        aria-hidden="true"
        className={cn(
          "text-background bg-muted absolute inset-0 z-10 items-baseline px-3 py-2 md:px-5 md:py-2.75",
          className,
        )}
        transition={{
          duration: 1.25,
          ease: [0.01, 0.95, 0.15, 1],
        }}
        variants={{
          initial: {
            clipPath: "inset(0% 100% 0% 0%)",
          },
          hover: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 0 },
          },
        }}
      >
        {scrambledText}
      </motion.div>
    </motion.div>
  );
};

const Table = ({ title, caption, rows }: TableProps) => {
  const controls = useAnimationControls();
  const { scrollY } = useScroll();
  const previousScrollY = useRef(scrollY.get());
  const scrollDirection = useRef(1);

  useMotionValueEvent(scrollY, "change", (latest) => {
    scrollDirection.current = latest >= previousScrollY.current ? 1 : -1;
    previousScrollY.current = latest;
  });

  return (
    <div className="h-min w-full">
      <motion.div
        className="bg-foreground/50 text-background flex justify-between px-3 py-2.5 md:px-5 md:py-3.5"
        initial={{ clipPath: "inset(0% 60% 0% 0%)" }}
        animate={controls}
        onViewportEnter={() => {
          if (scrollDirection.current > 0) {
            controls.start({
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            });
          }
        }}
        onViewportLeave={() => {
          if (scrollDirection.current < 0) {
            controls.start({
              clipPath: "inset(0% 60% 0% 0%)",
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            });
          }
        }}
        viewport={{ margin: "0px 0px -5% 0px" }}
      >
        <p className="text-lg font-medium md:text-[25px]">{title}</p>
        <p className="text-lg font-medium italic md:text-[25px]">{caption}</p>
      </motion.div>
      {rows.map((row, index) => (
        <Row key={index} {...row} />
      ))}
    </div>
  );
};

export default Table;
