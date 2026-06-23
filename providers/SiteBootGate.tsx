"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import SitePreloader from "@/ui/SitePreloader";
import { useMediaQuery } from "@/providers/MediaQueryContext";

type SiteBootGateProps = {
  children: React.ReactNode;
};

const SiteBootContext = createContext<{ isBootComplete: boolean }>({
  isBootComplete: true,
});

export const useSiteBoot = () => useContext(SiteBootContext);

const SiteBootGate = ({ children }: SiteBootGateProps) => {
  const { isMobile } = useMediaQuery();
  const shouldRunPreloader = !isMobile;
  const [showPreloader, setShowPreloader] = useState(() => shouldRunPreloader);

  useEffect(() => {
    if (isMobile && showPreloader) {
      setShowPreloader(false);
    }
  }, [isMobile, showPreloader]);

  const handleComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const value = useMemo(
    () => ({ isBootComplete: isMobile || !showPreloader }),
    [isMobile, showPreloader],
  );

  return (
    <SiteBootContext.Provider value={value}>
      {children}
      {showPreloader && !isMobile && <SitePreloader onComplete={handleComplete} />}
    </SiteBootContext.Provider>
  );
};

export default SiteBootGate;
