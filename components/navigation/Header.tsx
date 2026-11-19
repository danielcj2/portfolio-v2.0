"use client";

import Menu from "./Menu";
import Logo from "@/images/logo.svg";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLenisScroll } from "@/lib/useLenisScroll";
import {
  CONTACT_HEIGHT,
  HEADER_SCROLL_START_OFFSET,
} from "@/lib/layoutHeights";
import {
  useScroll,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";

const Header: React.FC = () => {
  const path = usePathname();
  const { navigateTo } = useLenisScroll();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const isHome = path === "/" || path.startsWith("/#");

  const { scrollYProgress } = useScroll({
    offset: [`end ${HEADER_SCROLL_START_OFFSET}`, `end ${CONTACT_HEIGHT}`],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextValue = latest === 0;

    setIsVisible((currentValue) =>
      currentValue === nextValue ? currentValue : nextValue,
    );
  });

  return (
    <header
      className={cn(
        "grid-12 mx pointer-events-none fixed inset-x-0 z-60",
        !isHome && "opacity-0",
      )}
    >
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            className="col-span-2 mt-6 justify-self-center md:col-span-1 md:mt-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <a
              href="/"
              className="pointer-events-auto block cursor-pointer py-2"
              aria-label="Scroll to top"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("#hero");
              }}
            >
              <Logo className="text-foreground h-8 w-auto md:h-12" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            className="col-span-1 mt-6 ml-2 md:mt-8 md:ml-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="text-muted font-mono text-xs font-semibold uppercase md:text-sm">
              v1.1
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <Menu scrollTo={navigateTo} scrollY={scrollY} isVisible={isVisible} />
    </header>
  );
};

export default Header;
