import Card from "@/ui/Card";
import Image from "next/image";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const r2Url = process.env.NEXT_PUBLIC_BENTO;

const LightDark = () => {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);
  const [split, setSplit] = useState(0.5);
  const [bend, setBend] = useState(0);
  const spring = useRef({ x: 0.5, v: 0 });

  useEffect(() => {
    const target = hovered === "left" ? 1 : hovered === "right" ? 0 : 0.5;
    let frame = 0;
    let previousTime = performance.now();

    const step = (time: number) => {
      const dt = Math.min((time - previousTime) / 1000, 0.032);
      previousTime = time;

      spring.current.v +=
        ((target - spring.current.x) * 200 - spring.current.v * 44) * dt;
      spring.current.x += spring.current.v * dt;

      const nextBend = Math.max(
        -5,
        Math.min(5, (target - spring.current.x) * 10),
      );
      setSplit(spring.current.x);
      setBend(nextBend);

      const settled =
        Math.abs(target - spring.current.x) < 0.0006 &&
        Math.abs(spring.current.v) < 0.002;

      if (settled) {
        spring.current.x = target;
        spring.current.v = 0;
        setSplit(target);
        setBend(0);
        return;
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);

  const boundary = [0, 0.25, 0.5, 0.75, 1].map((position) => {
    const curve = (bend / 100) * Math.sin(Math.PI * position);
    return `${(split + curve) * 100}% ${position * 100}%`;
  });
  const leftClipPath = `polygon(0 0, ${boundary.join(", ")}, 0 100%)`;
  const rightClipPath = `polygon(${boundary[0]}, 100% 0, 100% 100%, ${boundary[4]}, ${boundary[3]}, ${boundary[2]}, ${boundary[1]})`;

  return (
    <Card
      className="col-start-1 col-end-7 row-start-13 row-end-17 overflow-hidden xl:col-start-5 xl:col-end-9 xl:row-span-4 xl:row-start-9 xl:row-end-13"
      onHoverEnd={() => setHovered(null)}
    >
      <motion.div
        className="absolute inset-0 contain-paint"
        onHoverStart={() => setHovered("left")}
        initial={false}
        style={{ clipPath: leftClipPath }}
      >
        <div className="absolute inset-0 bg-linear-[90deg,#442f82,#422f7f,#352c68,#212137,#1b1b21,#1a1a1e_45%]" />
        <div className="absolute bottom-0 left-1/2 h-[115%] w-min -translate-x-1/2 translate-y-1/4">
          <Image
            src={`${r2Url}/accounting.png`}
            alt="quickQR Accounting Dashboard"
            width={1440}
            height={930}
            className="pointer-events-none h-full w-auto max-w-none object-contain select-none"
            sizes="(max-width: 1280px) 40vw, 24vw"
            decoding="async"
          />
          <div className="bg-foreground/20 absolute -inset-1 -z-1 w-auto rounded-[10px]" />
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 contain-paint"
        onHoverStart={() => setHovered("right")}
        initial={false}
        style={{ clipPath: rightClipPath }}
      >
        <div className="absolute inset-0 bg-linear-[90deg,#f2f3f0_40%,#c3dcc9,#84c7ba,#36aec0,#0090cd,#2a6acb]" />
        <div className="absolute bottom-0 left-1/2 h-[115%] w-min -translate-x-1/2 translate-y-1/4">
          <Image
            src={`${r2Url}/accounting-dark.png`}
            alt="quickQR Accounting Dashboard Dark Mode"
            width={1440}
            height={930}
            className="pointer-events-none h-full w-auto max-w-none object-contain select-none"
            sizes="(max-width: 1280px) 40vw, 24vw"
            decoding="async"
          />
          <div className="bg-background/30 absolute -inset-1 -z-1 w-auto rounded-[10px]" />
        </div>
      </motion.div>
    </Card>
  );
};

export default LightDark;
