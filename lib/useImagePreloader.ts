"use client";

import { useEffect, useRef, useState } from "react";

type Dimensions = { width: number; height: number };

export const useImagePreloader = (srcs: string[], minDelay = 0) => {
  const cachedRef = useRef<{ dimensions: Dimensions[] } | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions[]>([]);

  useEffect(() => {
    if (cachedRef.current) {
      setDimensions(cachedRef.current.dimensions);
      setIsReady(true);
      return;
    }

    let cancelled = false;

    const dimensionPromises = srcs.map(
      (src) =>
        new Promise<Dimensions>((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = () =>
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
          img.onerror = () => resolve({ width: 0, height: 0 });
        }),
    );

    const allPromises: Promise<unknown>[] = [
      ...dimensionPromises,
      ...(minDelay > 0
        ? [new Promise<void>((resolve) => setTimeout(resolve, minDelay))]
        : []),
    ];

    Promise.all(allPromises)
      .catch(() => {})
      .finally(async () => {
        if (!cancelled) {
          const dims = await Promise.all(dimensionPromises);
          cachedRef.current = { dimensions: dims };
          setDimensions(dims);
          setIsReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { isReady, dimensions };
};

