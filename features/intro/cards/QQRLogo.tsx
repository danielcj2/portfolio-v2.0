"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Card from "@/ui/Card";

const r2Url = process.env.NEXT_PUBLIC_QUICKQR;

const QQRLogo = () => {
  return (
    <Card className="col-span-2 row-span-4 overflow-hidden">
      <motion.div
        className="group relative h-full w-full"
        initial={{ backgroundColor: "#402e7c" }}
        whileHover={{ backgroundColor: ["#402e7c", "#436436"] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={`${r2Url}/logo.png`}
          alt="quickQR Logo"
          className="pointer-events-none absolute inset-0 m-auto transition-transform duration-500 ease-in-out select-none group-hover:scale-115"
          style={{
            filter:
              "drop-shadow(0 10px 15px rgb(0 0 0 / 0.2)) drop-shadow(0 4px 6px rgb(0 0 0 / 0.2))",
          }}
          width={125}
          height={125}
        />
      </motion.div>
    </Card>
  );
};

export default QQRLogo;
