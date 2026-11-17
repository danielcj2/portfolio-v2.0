import { cn } from "@/lib/utils";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMediaQuery } from "@/providers/MediaQueryContext";
import { useMotionValueEvent, type MotionValue } from "motion/react";

import MenuIcon from "../ui/MenuIcon";
import WorkStatus from "../ui/WorkStatus";
import ScrollTracker from "../ui/ScrollTracker";
import TextScramble from "../animations/TextScramble";

type SectionHref = "#hero" | "#work" | "#about" | "#footer";

const SECTIONS = [
  { text: "Work", href: "#work" },
  { text: "About", href: "#about" },
  { text: "Contact", href: "#footer" },
] as const;

type NavProps = {
  scrollTo: (target: SectionHref) => void;
  scrollY: MotionValue;
  isVisible: boolean;
};

type NavLinkProps = {
  text: string;
  href: SectionHref;
  onNavigate: (target: SectionHref) => void;
};

const NavLink = ({ text, href, onNavigate }: NavLinkProps) => (
  <a
    href={href}
    className="[pointer-events:all] w-min"
    onClick={(e) => {
      e.preventDefault();
      onNavigate(href);
    }}
  >
    <span className="block w-min font-mono text-[0.8125rem] whitespace-nowrap uppercase md:text-sm">
      <TextScramble className="p-2" text={text} />
    </span>
  </a>
);

const MobileMenu = ({ scrollTo, isVisible }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav
      className={cn(
        "[pointer-events:all] relative col-start-11 col-end-13 row-start-1 mt-(--gap) mr-[calc(-1.5*var(--gap))] flex h-min min-h-12 w-min min-w-12 flex-col items-end justify-self-end",
        isOpen ? "pb-5 pl-4" : "pb-1 pl-1",
      )}
      aria-expanded={isOpen}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.button
            type="button"
            aria-label="Toggle menu"
            className="relative aspect-square size-12 cursor-pointer"
            onClick={toggleMenu}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24, width: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <MenuIcon isOpen={isOpen} />
          </motion.button>
        )}
      </AnimatePresence>
      {SECTIONS.map(({ text, href }) => (
        <AnimatePresence initial={false} key={text}>
          {isOpen && isVisible && (
            <motion.div
              className="w-min pr-1"
              layout="position"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24, width: 0, height: 0 }}
              transition={{
                opacity: { duration: 0.3, ease: "easeInOut" },
                x: { duration: 0.3, ease: "easeInOut" },
                height: {
                  duration: 0.3,
                  delay: 0.3,
                  ease: "easeInOut",
                },
                layout: { duration: 0.3, ease: "easeInOut" },
              }}
            >
              <NavLink text={text} href={href} onNavigate={scrollTo} />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            className="crt-nav-shape pointer-events-none absolute inset-0 -z-1 origin-top-right"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            exit={{
              scale: 0,
              transition: { duration: 0.45, ease: "easeInOut", delay: 0.3 },
            }}
          >
            <motion.div
              layout
              className="bg-background-v2 absolute size-full rounded-bl-[20px]"
            />
            <motion.div
              layout="position"
              className="absolute top-0 right-full aspect-square h-auto w-6"
            >
              <div className="bg-background-v2 absolute inset-0 mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)]" />
            </motion.div>
            <motion.div
              layout="position"
              className="absolute top-full right-0 aspect-square h-auto w-6"
            >
              <div className="bg-background-v2 absolute inset-0 mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DesktopMenu = ({ scrollTo, scrollY, isVisible }: NavProps) => {
  const [isStacked, setIsStacked] = useState(false);
  const [hideWorkStatus, setHideWorkStatus] = useState(false);
  const isStackedRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 400;
    if (next === isStackedRef.current) return;
    isStackedRef.current = next;

    if (next) {
      setHideWorkStatus(true);
      return;
    }

    setIsStacked(false);
    setHideWorkStatus(false);
  });

  return (
    <>
      <AnimatePresence>
        {isVisible && isStacked && (
          <motion.div
            className="col-start-10 mt-8 hidden justify-self-end md:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ScrollTracker />
          </motion.div>
        )}
      </AnimatePresence>
      <nav
        className={cn(
          "relative col-start-11 col-end-13 mt-(--gap) mr-[calc(-3*var(--gap))] hidden h-min w-min justify-self-end md:flex",
          isStacked
            ? "min-h-14 min-w-14 flex-col px-4 pt-3 pb-5"
            : "gap-1 pr-1 pb-2 pl-5",
        )}
      >
        {SECTIONS.map(({ text, href }) => (
          <AnimatePresence initial={false} key={text}>
            {isVisible && (
              <motion.div
                className="w-min"
                layout="position"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24, width: 0, height: 0 }}
                transition={{
                  opacity: { duration: 0.3, ease: "easeInOut" },
                  x: { duration: 0.3, ease: "easeInOut" },
                  height: {
                    duration: 0.3,
                    delay: 0.3,
                    ease: "easeInOut",
                  },
                  layout: { duration: 0.3, ease: "easeInOut" },
                }}
              >
                <NavLink text={text} href={href} onNavigate={scrollTo} />
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        <AnimatePresence
          initial={false}
          onExitComplete={() => {
            if (isStackedRef.current) {
              setIsStacked(true);
            }
          }}
        >
          {!hideWorkStatus && <WorkStatus status="LFW" />}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {isVisible && (
            <motion.div
              className="crt-nav-shape pointer-events-none absolute inset-0 -z-1 origin-top-right"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              exit={{
                scale: 0,
                transition: { duration: 0.45, ease: "easeInOut", delay: 0.3 },
              }}
            >
              <motion.div
                className="bg-background-v2 pointer-events-auto absolute inset-0 h-full w-full rounded-bl-4xl"
                layout
              />
              <motion.div
                layout
                className={cn(
                  "absolute top-0 right-full aspect-square h-auto",
                  isStacked ? "w-6" : "w-4",
                )}
              >
                <div className="bg-background-v2 absolute inset-0 mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)]" />
              </motion.div>
              <motion.div
                layout
                className="absolute top-full right-0 aspect-square h-auto w-8"
              >
                <div className="bg-background-v2 absolute inset-0 mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const Menu = (props: NavProps) => {
  const { isMobile } = useMediaQuery();

  return isMobile ? <MobileMenu {...props} /> : <DesktopMenu {...props} />;
};

export default Menu;
