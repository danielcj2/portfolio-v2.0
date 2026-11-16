import Card from "@/ui/Card";
import Image from "next/image";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const r2Url = process.env.NEXT_PUBLIC_BENTO;

const mobileScreens = [
  { src: `${r2Url}/ravensview.png`, alt: "Ravensview Home Screen" },
  { src: `${r2Url}/ravensview_about.png`, alt: "Ravensview About" },
  { src: `${r2Url}/ravensview_approach.png`, alt: "Ravensview Approach" },
  { src: `${r2Url}/ravensview_newsletter.png`, alt: "Ravensview Newsletter" },
  { src: `${r2Url}/ravensview_footer.png`, alt: "Ravensview Footer Screen" },
] as const;

const MobileGallery = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState(0);
  const positionRef = useRef({ x: 0, v: 0 });
  const targetRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let previousTime = performance.now();
    if (!isHovered) {
      targetRef.current = Math.round(positionRef.current.x);
    }

    const animate = (time: number) => {
      const deltaTime = Math.min((time - previousTime) / 1000, 0.032);
      previousTime = time;
      const current = positionRef.current;

      if (isHovered) {
        targetRef.current += deltaTime * 0.58;
      }

      current.v +=
        ((targetRef.current - current.x) * 250 - current.v * 44) * deltaTime;
      current.x += current.v * deltaTime;

      if (
        !isHovered &&
        Math.abs(targetRef.current - current.x) < 0.0006 &&
        Math.abs(current.v) < 0.002
      ) {
        current.x = targetRef.current;
        current.v = 0;
        setPosition(targetRef.current);
        frameRef.current = null;
        return;
      }

      setPosition(current.x);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isHovered]);

  return (
    <Card
      className="col-start-1 col-end-4 row-start-8 row-end-13 overflow-hidden bg-[#302E3C]/80 xl:col-end-3"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(30deg,#3E3E4C_0,#3E3E4C_2px,transparent_2px,transparent_12px,#1e1e24_12px,#1e1e24_14px,transparent_14px,transparent_40px)]" />
      <motion.div className="relative z-1 h-full w-full">
        <div className="relative flex h-full w-full items-center justify-center">
          {mobileScreens.map(({ src, alt }, index) => {
            let distance = index - position;

            while (distance > mobileScreens.length / 2) {
              distance -= mobileScreens.length;
            }
            while (distance < -mobileScreens.length / 2) {
              distance += mobileScreens.length;
            }

            const distanceFromCenter = Math.abs(distance);
            const curve = distance * distance * 12;
            const scale = 1.08 - Math.min(distanceFromCenter, 2) * 0.1;

            return (
              <div
                key={alt}
                className="pointer-events-none absolute inset-x-[15%] top-[14%] flex justify-center"
                style={{
                  transform: `translate(${distance * 135}%, ${curve}%) rotate(${distance * 12}deg) scale(${scale})`,
                  zIndex: Math.round(100 - distanceFromCenter * 10),
                  opacity: Math.max(0.25, 1 - distanceFromCenter * 0.28),
                }}
              >
                <motion.div
                  className="size-full overflow-clip rounded-t-lg"
                  animate={{ scale: isHovered ? 0.9 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={402}
                    height={830}
                    className="h-auto w-full select-none"
                    decoding="async"
                    sizes="(min-width: 1536px) 12vw, (min-width: 1280px) 15vw, 24vw"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </Card>
  );
};

export default MobileGallery;
