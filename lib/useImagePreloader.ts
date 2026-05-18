"use client";

import { useEffect, useState } from "react";

type Dimensions = { width: number; height: number };

const cache = new Map<string, Dimensions[]>();

export const useImagePreloader = (srcs: string[], minDelay = 0) => {
  const cacheKey = srcs.join("|");
  const [isReady, setIsReady] = useState(() => cache.has(cacheKey));
  const [dimensions, setDimensions] = useState<Dimensions[]>(() => cache.get(cacheKey) ?? []);

  useEffect(() => {
    if (cache.has(cacheKey)) {
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
          cache.set(cacheKey, dims);
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

