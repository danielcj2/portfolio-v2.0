"use client";

import { motion } from "motion/react";

const statusMap = {
  LFW: { label: "For Hire", color: "bg-lime-600" },
  NA: { label: "Not Available", color: "bg-red-500" },
  LA: { label: "Limited", color: "bg-orange-500" },
} as const;

type StatusProps = {
  status?: keyof typeof statusMap;
};

const WorkStatus = ({ status = "NA" }: StatusProps) => {
  const config = statusMap[status];

  return (
    <motion.div
      className="hidden overflow-hidden md:block"
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, width: 0 }}
      transition={{
        opacity: { duration: 0.3, ease: "easeInOut" },
        x: { duration: 0.3, ease: "easeInOut" },
        layout: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <div className="border-muted/8 ml-1.5 flex h-full items-center gap-2.75 border-l p-2 pl-4 text-nowrap">
        <p className="font-mono text-sm leading-none uppercase">
          <span>{config.label}</span>
        </p>
        <span className="relative mb-0.5 block">
          <motion.span
            className={`absolute -inset-0.75 rounded-full will-change-transform ${config.color}`}
            animate={{ scale: [0.6, 1.4], opacity: [0.5, 0] }}
            transition={{
              duration: 1.25,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
            }}
            aria-hidden
          />
          <span
            className={`relative z-10 block h-1.5 w-2.75 rounded-xs shadow-sm shadow-lime-400 ${config.color}`}
          />
        </span>
      </div>
    </motion.div>
  );
};

export default WorkStatus;
