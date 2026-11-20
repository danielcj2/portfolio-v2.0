"use client";

import jump from "@/images/jump.png";
import jump2 from "@/images/jump2.png";
import decending from "@/images/decending.png";
import decending2 from "@/images/decending2.png";

import Image from "next/image";

import {
  motion,
  animate,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { useMediaQuery } from "@/providers/MediaQueryContext";

type BungeeProps = {
  rotate: MotionValue<number>;
  pendulumProgress: MotionValue<number>;
};

const SETTLED_DROP = 210;

const BungeeJump = ({ rotate, pendulumProgress }: BungeeProps) => {
  const { isLg, isXl } = useMediaQuery();
  const pendulumRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const isSwinging = useRef(false);
  const maxDrop = isXl ? 210 : isLg ? 130 : 220;

  // Slide pendulum down as it scrolls past Interlude
  const pendulumY = useTransform(pendulumProgress, [0, 1], [0, maxDrop]);
  const dropTarget = useTransform(
    rotate,
    [0, -100, -120, -145, -180],
    [50, 50, 360, 150, SETTLED_DROP],
  );
  const dropY = useSpring(dropTarget, { stiffness: 200, damping: 30 });
  const ropeHeight = useTransform(
    [dropY, pendulumY],
    ([drop, slide]: number[]) => drop + slide,
  );

  const [imgSrc, setImgSrc] = useState(jump);
  const prevDrop = useRef(0);
  useMotionValueEvent(dropTarget, "change", (v) => {
    if (pendulumY.get() > 0 || v === SETTLED_DROP) return;
    setImgSrc(v >= prevDrop.current ? jump2 : jump);
    prevDrop.current = v;
  });

  useMotionValueEvent(pendulumY, "change", (v) => {
    setImgSrc(v === maxDrop ? decending2 : v > 0 ? decending : jump2);
  });

  const swing = (clientX: number) => {
    if (rotate.get() > -179) return;
    if (!pendulumRef.current || isSwinging.current) return;

    isSwinging.current = true;

    const rect = pendulumRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const fromLeft = clientX < centerX;
    const dir = fromLeft ? -1 : 1;

    // mirror image on hover
    if (imgRef.current) {
      animate(
        imgRef.current,
        { scaleX: dir },
        { duration: 0.4, ease: "easeOut" },
      );
    }

    // swing pendulum
    animate(
      pendulumRef.current,
      { rotate: dir * 25 },
      { duration: 0.4, ease: "easeOut" },
    ).then(() => {
      if (!pendulumRef.current) return;
      animate(
        pendulumRef.current,
        { rotate: 0 },
        { type: "spring", stiffness: 60, damping: 4, mass: 1.5 },
      ).then(() => {
        isSwinging.current = false;
      });
    });
  };

  return (
    <motion.div
      ref={pendulumRef}
      className="[pointer-events:all] absolute top-1/2 left-1/2 origin-top -translate-x-1/2 backface-hidden"
      onMouseEnter={(event) => swing(event.clientX)}
      onTapStart={(_, info) => swing(info.point.x - window.scrollX)}
    >
      <motion.div
        className="mx-auto w-px bg-[rgba(255,255,255,0.05)]"
        style={{ height: ropeHeight }}
      />
      <div ref={imgRef} className="h-min w-22 grayscale">
        <Image
          className="h-auto w-full opacity-60"
          src={imgSrc}
          alt="Jump"
          fetchPriority="high"
        />
      </div>
    </motion.div>
  );
};

export default BungeeJump;
