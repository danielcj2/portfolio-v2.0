"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

type MediaQueryContextType = { isMobile: boolean };

const MediaQueryContext = createContext<MediaQueryContextType | undefined>(
  undefined,
);

const MOBILE_QUERY = "(max-width: 767px)";

export const MediaQueryProvider = ({
  children,
  initialMobile = false,
}: {
  children: React.ReactNode;
  initialMobile?: boolean;
}) => {
  const [isMobile, setIsMobile] = useState(initialMobile);

  useLayoutEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY);

    const updateMediaQuery = () => {
      setIsMobile(mobileQuery.matches);
    };

    updateMediaQuery();

    const onChange = () => updateMediaQuery();

    mobileQuery.addEventListener("change", onChange);

    return () => {
      mobileQuery.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <MediaQueryContext.Provider value={{ isMobile }}>
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
