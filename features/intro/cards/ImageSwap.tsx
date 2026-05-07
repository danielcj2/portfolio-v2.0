import Card from "@/ui/Card";
import Image from "next/image";
import { motion, type Variants } from "motion/react";

type SwapLayer = {
  src: string;
  alt: string;
  variants: Variants;
};

const r2Url = process.env.NEXT_PUBLIC_BLUEWAVE;

const swapLayers: SwapLayer[] = [
  {
    src: `${r2Url}/monitors-short.png`,
    alt: "Monitors Screen",
    variants: {
      initial: { top: "45%", left: "22%", zIndex: 2, rotate: -15 },
      hovered: { top: "15%", left: "32%", zIndex: 1, rotate: -5 },
    },
  },
  {
    src: `${r2Url}/integrations-short.png`,
    alt: "Integrations Screen",
    variants: {
      initial: { top: "15%", left: "32%", zIndex: 1, rotate: -5 },
      hovered: { top: "45%", left: "22%", zIndex: 2, rotate: -15 },
    },
  },
];

const ImageSwap = () => {
  return (
    <Card
      className="z-0 col-span-2 row-span-6 overflow-hidden bg-[#F2F3F0]/70"
      initial="initial"
      whileHover="hovered"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,#442F82,transparent)] opacity-45 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(45deg,rgba(122,122,125,0.5)_0,rgba(122,122,125,0.5)_0,transparent_1px,transparent_54px),repeating-linear-gradient(-45deg,rgba(127,121,142,0.35)_0,rgba(127,121,142,0.35)_1px,transparent_54px,transparent_54px)]" />
      <div
        className="font-chakra text-background/15 pointer-events-none absolute top-32 -left-2 -rotate-45 text-6xl font-semibold text-nowrap uppercase italic select-none [word-spacing:0.125em]"
        aria-hidden="true"
      >
        Hover me!
      </div>
      {swapLayers.map(({ src, alt, variants }) => (
        <motion.div
          key={alt}
          className="pointer-events-none absolute h-[90%] w-auto select-none"
          variants={variants}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt={alt}
            className="h-full w-auto max-w-none shadow-2xl"
            loading="lazy"
            width={800}
            height={800}
            sizes="(max-width: 768px) 80vw, 18vw"
          />
          <div className="bg-background/20 absolute -inset-1.25 -z-1 w-auto rounded-xl" />
        </motion.div>
      ))}
    </Card>
  );
};

export default ImageSwap;
