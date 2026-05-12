import Card from "@/ui/Card";
import Image from "next/image";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

const r2Url = process.env.NEXT_PUBLIC_QUICKQR;

const mobileScreens = [
  { src: `${r2Url}/banner.png`, alt: "Banner Screen" },
  { src: `${r2Url}/two_factor.png`, alt: "Two Factor Screen" },
  { src: `${r2Url}/accounting_mobile.png`, alt: "Accounting Mobile Dashboard" },
  { src: `${r2Url}/erp_mobile.png`, alt: "Task Tracking Mobile" },
  { src: `${r2Url}/create_invoice.png`, alt: "Invoice Confirmation Screen" },
] as const;

const MobileScroller = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [targetScrollDistance, setTargetScrollDistance] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateScrollDistance = () => {
      if (cardRef.current && contentRef.current) {
        const cardHeight = cardRef.current.offsetHeight;
        const contentHeight = contentRef.current.offsetHeight;
        setScrollDistance(Math.max(contentHeight - cardHeight, 0));
      }
    };

    const resizeObserver = new ResizeObserver(updateScrollDistance);

    updateScrollDistance();

    if (cardRef.current) resizeObserver.observe(cardRef.current);
    if (contentRef.current) resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Card
      ref={cardRef}
      className="col-start-1 col-end-4 row-start-8 row-end-13 overflow-hidden bg-[#302E3C]/80 xl:col-end-3"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(30deg,#3E3E4C_0,#3E3E4C_2px,transparent_2px,transparent_12px,#1e1e24_12px,#1e1e24_14px,transparent_14px,transparent_40px)]" />
      <motion.div
        ref={contentRef}
        className="relative flex h-min w-full flex-col items-center gap-6 px-10 py-8 will-change-transform"
        onHoverStart={() => {
          setTargetScrollDistance(scrollDistance);
          setIsHovered(true);
        }}
        onHoverEnd={() => setIsHovered(false)}
        animate={{ y: isHovered ? -targetScrollDistance : 0 }}
        transition={{
          type: "tween",
          duration: isHovered ? 12 : 2,
          ease: isHovered ? "easeInOut" : "easeOut",
        }}
      >
        {mobileScreens.map(({ src, alt }) => (
          <Image
            key={alt}
            src={src}
            alt={alt}
            width={439}
            height={916}
            className="pointer-events-none h-auto w-full select-none"
            sizes="(max-width: 768px) 100vw, 18vw"
          />
        ))}
      </motion.div>
    </Card>
  );
};

export default MobileScroller;
