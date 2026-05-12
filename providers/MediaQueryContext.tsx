"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

type MediaQueryContextType = { isMobile: boolean; isLg: boolean };

const MediaQueryContext = createContext<MediaQueryContextType | undefined>(
  undefined,
);

const MOBILE_QUERY = "(max-width: 767px)";
const LG_QUERY = "(min-width: 1024px)";

export const MediaQueryProvider = ({
  children,
  initialMobile = false,
}: {
  children: React.ReactNode;
  initialMobile?: boolean;
}) => {
  const [isMobile, setIsMobile] = useState(initialMobile);
  const [isLg, setIsLg] = useState(false);

  useLayoutEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const lgQuery = window.matchMedia(LG_QUERY);

    const updateMediaQuery = () => {
      setIsMobile(mobileQuery.matches);
      setIsLg(lgQuery.matches);
    };

    updateMediaQuery();

    const onChange = () => updateMediaQuery();

    mobileQuery.addEventListener("change", onChange);
    lgQuery.addEventListener("change", onChange);

    return () => {
      mobileQuery.removeEventListener("change", onChange);
      lgQuery.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <MediaQueryContext.Provider value={{ isMobile, isLg }}>
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
