"use client";

import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export const PENDING_SCROLL_TARGET = "pending-scroll-target";

export function useLenisScroll() {
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  const scrollTo = useCallback(
    (id: string) => {
      const target = id.startsWith("#") ? id : `#${id}`;
      const element = document.getElementById(target.slice(1));
      const distance = element
        ? Math.abs(element.getBoundingClientRect().top)
        : 0;
      const duration = Math.min(1.5, Math.max(0.4, distance / 1400));

      lenis?.scrollTo(target, {
        duration,
        easing: (time) =>
          time < 0.5 ? 2 * time * time : 1 - Math.pow(-2 * time + 2, 2) / 2,
      });
    },
    [lenis],
  );

  const navigateTo = useCallback(
    (id: string) => {
      const target = id.startsWith("#") ? id : `#${id}`;

      if (pathname === "/") {
        scrollTo(target);
        return;
      }

      router.push(`/${target}`);
    },
    [pathname, router, scrollTo],
  );

  return { navigateTo, scrollTo };
}
