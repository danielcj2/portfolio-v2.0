import Gradient from "@/images/gradient.svg";

import Card from "@/ui/Card";
import Image from "next/image";

import { motion } from "motion/react";
import { useState } from "react";

const r2Url = process.env.NEXT_PUBLIC_BENTO;

const MobileReveal = () => {
  const [isHovered, setIsHovered] = useState(false);
  const layerTransition = {
    duration: 1.2,
    ease: [0.65, 0, 0.35, 1],
  } as const;

  return (
    <Card
      className="border-muted/10 col-span-2 row-span-6 hidden overflow-hidden 2xl:block"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-[#dad2cd]"
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 1.088,
          filter: isHovered ? "blur(0px)" : "blur(16px)",
        }}
        transition={layerTransition}
      >
        <div
          className="absolute inset-x-4 top-[15%]"
          style={{
            filter:
              "drop-shadow(0 10px 15px rgb(0 0 0 / 0.2)) drop-shadow(0 10px 12px rgb(0 0 0 / 0.2))",
          }}
        >
          <Image
            src={`${r2Url}/accounting_mobile.png`}
            alt="Accounting Mobile Dashboard"
            className="h-auto w-full"
            width={439}
            height={916}
            sizes="(min-width: 1280px) 15vw, 24vw"
          />
        </div>
      </motion.div>
      <motion.div
        className="bg-background absolute inset-0 contain-paint"
        initial={false}
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 1.128 : 1,
          filter: isHovered ? "blur(16px)" : "blur(0px)",
        }}
        transition={layerTransition}
      >
        <Gradient className="pointer-events-none absolute aspect-550/825 h-full w-auto select-none" />
      </motion.div>
    </Card>
  );
};

export default MobileReveal;
