"use client";

import React from "react";
import { motion } from "motion/react";

const statusMap = {
  LFW: { label: "Looking for Work", color: "bg-lime-600" },
  NA: { label: "Not Available", color: "bg-red-500" },
  LA: { label: "Limited Availability", color: "bg-orange-500" },
} as const;

export type WorkStatusValue = keyof typeof statusMap;

const WorkStatus = ({ status = "NA" }: { status?: WorkStatusValue }) => {
  const config = statusMap[status];

  return (
    <div className="font-chakra px-4 py-1.75 font-medium">
      <p className="text-muted mb-1 text-xs font-bold">Current Status</p>
      <div className="flex flex-row items-center gap-1.5">
        <span className="relative inline-flex items-center justify-center">
          <motion.span
            className={`absolute -inset-0.75 rounded-full ${config.color}`}
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{
              duration: 1.25,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
            aria-hidden
          />
          <span
            className={`relative z-10 block h-2.5 w-1 rounded-full ${config.color}`}
          />
        </span>
        <p className="text-sm leading-none uppercase">
          <span>{config.label}</span>
        </p>
      </div>
    </div>
  );
};

export default WorkStatus;
