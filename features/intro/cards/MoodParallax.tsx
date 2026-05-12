import TextParallax from "@/animations/TextParallax";
import Card from "@/ui/Card";

import { motion } from "motion/react";

const MoodParallax = () => {
  const items = [
    "I like trains",
    "Fueled by caffeine (obviously)",
    "Probably overthinking this",
    "Yes, this is intentional",
    "Wow, so subtle",
    "No, really—details matter",
  ];

  return (
    <Card
      className="border-muted/10 col-span-3 row-span-2 xl:col-span-8 2xl:col-span-4"
      initial="initial"
      whileHover="hovered"
    >
      <TextParallax items={items} options={{ baseVelocity: 60 }} />
      <motion.div
        className="text-muted-v2 font-chakra absolute top-1/2 left-[calc(100%+15px)] -translate-x-1/2 -translate-y-1/2 rotate-90 text-[0.625rem] font-bold tracking-wider whitespace-nowrap uppercase"
        variants={{ initial: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        Brr — train is coming
      </motion.div>
    </Card>
  );
};

export default MoodParallax;
