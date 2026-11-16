import Card from "@/components/ui/Card";
import { motion } from "motion/react";

const ScrollIndicator = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="absolute inset-x-0 bottom-0">
      <motion.a
        className="block max-w-74"
        layout
        initial="initial"
        whileHover="hover"
        href="#intro"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <div className="relative w-full">
          <motion.div
            className="relative bottom-full left-0 ml-1 flex items-baseline gap-0.75 whitespace-nowrap md:absolute md:mb-2.5"
            variants={{
              initial: { left: "0%" },
              hover: { left: "3%" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="font-mono text-[0.8125rem] font-medium tracking-wide uppercase md:text-sm">
              Scroll to discover
            </p>
            <span className="bg-muted ml-0.5 size-0.75 shrink-0" />
            <span className="bg-muted size-0.75 shrink-0" />
          </motion.div>
          <motion.div
            className="hidden origin-bottom md:block"
            variants={{
              initial: { scale: 1 },
              hover: { scale: 0.94 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Card className="border-muted/10 bottom-0 aspect-5/3 h-auto w-full" />
          </motion.div>
        </div>
      </motion.a>
    </div>
  );
};

export default ScrollIndicator;
