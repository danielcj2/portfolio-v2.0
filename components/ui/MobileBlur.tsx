"use client";

import { useMediaQuery } from "@/providers/MediaQueryContext";

const MobileBlur = () => {
  const { isMobile } = useMediaQuery();

  if (!isMobile) return null;

  return (
    <div className="pointer-events-none fixed top-0 z-12 h-24 w-full bg-[linear-gradient(to_bottom,var(--color-background)_0%,transparent_100%)]"></div>
  );
};

export default MobileBlur;
