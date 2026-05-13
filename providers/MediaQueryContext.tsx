"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

type MediaQueryContextType = {
  isMobile: boolean;
  isLg: boolean;
  isXl: boolean;
};

const MediaQueryContext = createContext<MediaQueryContextType | undefined>(
  undefined,
);

const MOBILE_QUERY = "(max-width: 767px)";
const LG_QUERY = "(min-width: 1024px)";
const XL_QUERY = "(min-width: 1280px)";

export const MediaQueryProvider = ({
  children,
  initialMobile = false,
}: {
  children: React.ReactNode;
  initialMobile?: boolean;
}) => {
  const [breakpoints, setBreakpoints] = useState<MediaQueryContextType>({
    isMobile: initialMobile,
    isLg: false,
    isXl: false,
  });

  useLayoutEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const lgQuery = window.matchMedia(LG_QUERY);
    const xlQuery = window.matchMedia(XL_QUERY);

    const updateBreakpoints = () => {
      setBreakpoints({
        isMobile: mobileQuery.matches,
        isLg: lgQuery.matches,
        isXl: xlQuery.matches,
      });
    };

    updateBreakpoints();

    const onChange = () => updateBreakpoints();

    mobileQuery.addEventListener("change", onChange);
    lgQuery.addEventListener("change", onChange);
    xlQuery.addEventListener("change", onChange);

    return () => {
      mobileQuery.removeEventListener("change", onChange);
      lgQuery.removeEventListener("change", onChange);
      xlQuery.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <MediaQueryContext.Provider value={breakpoints}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaQuery = () => {
  const context = useContext(MediaQueryContext);
  if (!context) {
    throw new Error("useMediaQuery must be used within MediaQueryProvider");
  }
  return context;
};
