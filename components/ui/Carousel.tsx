"use client";

import { useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { CaretRightIcon } from "@phosphor-icons/react";

type CarouselProps = {
  items: React.ReactNode[];
  bg?: string;
  isLoading?: boolean;
};
type CaretProps = { direction: "left" | "right"; onClick: () => void };
type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (slide: number) => void;
};

const Caret = ({ direction, onClick }: CaretProps) => {
  const props = {
    left: { x: "left-4", scale: "-scale-x-100", translate: "-translate-x-px" },
    right: { x: "right-4", scale: "", translate: "translate-x-px" },
  } as const;
  const { x, scale, translate } = props[direction];

  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${x}`}>
      <motion.span
        role="button"
        tabIndex={0}
        aria-label={`Go to ${direction} slide`}
        className="bg-background/60 block cursor-pointer rounded-full p-2 backdrop-blur-sm select-none"
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        }}
      >
        <CaretRightIcon
          className={`text-foreground relative size-5 ${scale} ${translate}`}
          weight="bold"
        />
      </motion.span>
    </div>
  );
};

const Pagination = ({ current, total, onPageChange }: PaginationProps) => {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
      <div className="bg-background/60 flex w-max items-center gap-1 rounded-2xl p-1.5 backdrop-blur-sm">
        {Array.from({ length: total }).map((_, index) => (
          <motion.span
            key={index}
            role="button"
            tabIndex={0}
            className="h-1.75 cursor-pointer rounded-full select-none"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => onPageChange(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onPageChange(index);
              }
            }}
            initial={{ backgroundColor: "rgba(255, 255, 255, 0.4)", width: 7 }}
            animate={{
              backgroundColor:
                index === current
                  ? "rgba(255, 255, 255, 1)"
                  : "rgba(255, 255, 255, 0.4)",
              width: index === current ? 16 : 7,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

const dotVariants: Variants = {
  jump: {
    y: -15,
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const LoadingState = () => (
  <motion.div
    className="flex h-full items-center justify-center gap-1"
    animate="jump"
    transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
  >
    {Array.from({ length: 3 }).map((_, index) => (
      <motion.div
        key={index}
        className="bg-foreground size-1.75 rounded-full will-change-transform"
        variants={dotVariants}
      />
    ))}
  </motion.div>
);

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%" }),
};

const Carousel = ({ items, bg, isLoading = false }: CarouselProps) => {
  const itemCount = items.length;
  const canLoop = itemCount > 1;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = (dir: 1 | -1) => {
    if (isAnimating) return;
    setDirection(dir);
    setPage((p) => (p + dir + itemCount) % itemCount);
  };

  return (
    <div className="relative size-full overflow-hidden">
      <motion.div
        className={`absolute inset-0 -z-1 ${bg}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingState />
        ) : (
          <motion.div
            className="size-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                {items[page]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      {canLoop && !isLoading && (
        <>
          <Pagination
            current={page}
            total={itemCount}
            onPageChange={(slide) => {
              if (isAnimating) return;
              setDirection(slide > page ? 1 : -1);
              setPage(slide);
            }}
          />
          <Caret direction="left" onClick={() => navigate(-1)} />
          <Caret direction="right" onClick={() => navigate(1)} />
        </>
      )}
    </div>
  );
};

export default Carousel;
