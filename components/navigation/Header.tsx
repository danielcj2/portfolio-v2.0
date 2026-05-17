"use client";

import ScrollTracker from "@/ui/ScrollTracker";
import AnimatedLogo from "@/animations/AnimatedLogo";
import Logo from "@/images/logo.svg";
import r48Mask from "@/images/r48.svg?url";

import {
  useScroll,
  motion,
  useMotionValueEvent,
  AnimatePresence,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useState } from "react";
import { useLenisScroll } from "@/providers/LenisContext";
import { useScrollContainer } from "@/providers/ScrollContext";
import { useMediaQuery } from "@/providers/MediaQueryContext";
import {
  CONTACT_HEIGHT,
  HEADER_SCROLL_START_OFFSET,
} from "@/lib/layoutHeights";
import { usePathname } from "next/navigation";

type NavProps = {
  scrollTo: (target: SectionHref) => void;
  scrollY: MotionValue;
};

type NavLinkProps = {
  text: string;
  href: SectionHref;
  index: number;
  onNavigate: (target: SectionHref) => void;
};

type SectionHref = "#hero" | "#work" | "#about" | "#end-buffer";

const SECTIONS = [
  { text: "my work", href: "#work" },
  { text: "about me", href: "#about" },
  { text: "reach out", href: "#end-buffer" },
] as const;

const MENU_TRANSITION = {
  duration: 0.3,
  ease: [0.43, 0.13, 0.23, 0.96] as const,
};

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="absolute top-2 right-2 size-7 min-h-7 min-w-7">
    <motion.span
      className="absolute top-1 block h-0.5 w-3 rounded-full bg-white"
      animate={
        isOpen
          ? {
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              width: 20,
              rotate: 45,
            }
          : { top: 4, left: 0, x: 0, y: 0, width: 12, rotate: 0 }
      }
      transition={MENU_TRANSITION}
    />
    <motion.span
      className="absolute top-1/2 left-0 block h-0.5 w-7 -translate-y-1/2 rounded-full bg-white"
      animate={
        isOpen
          ? { left: "50%", x: "-50%", width: 20, rotate: -45 }
          : { left: 0, x: 0, width: 28, rotate: 0 }
      }
      transition={MENU_TRANSITION}
    />
    <motion.span
      className="bg-muted-v2 absolute top-5.5 right-0 block h-0.5 w-3 rounded-full"
      animate={isOpen ? { opacity: 0, x: 6 } : { opacity: 1, x: 0 }}
      transition={MENU_TRANSITION}
    />
  </div>
);

const NavLink: React.FC<NavLinkProps> = ({ text, href, index, onNavigate }) => (
  <a
    href={href}
    className="[pointer-events:all] text-[0.8125rem] capitalize"
    onClick={(e) => {
      e.preventDefault();
      onNavigate(href);
    }}
  >
    <motion.div
      className="ml-auto flex w-min flex-col gap-0.5 whitespace-nowrap"
      initial="initial"
      whileHover="hovered"
    >
      <div className="flex items-center justify-between gap-1">
        <motion.span
          className="bg-muted block h-px w-full origin-right opacity-35"
          variants={{
            initial: { scaleX: 0 },
            hovered: { scaleX: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        />
        <motion.p
          className="font-chakra text-[0.6875rem] leading-3 font-bold tracking-wider"
          variants={{
            initial: { color: "var(--color-muted)" },
            hovered: { color: "var(--color-accent)" },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          0{index + 1}
        </motion.p>
      </div>
      <p className="text-end font-[550]">{text}</p>
    </motion.div>
  </a>
);

const DesktopNav = ({ scrollTo, scrollY }: NavProps) => {
  const [isStacked, setIsStacked] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsStacked(latest > 500);
  });

  return (
    <div className="mx grid-12 w-full pt-8">
      <AnimatedLogo onClick={() => scrollTo("#hero")} />
      <AnimatePresence>
        {isStacked && (
          <motion.div
            className="col-start-10 justify-self-end"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ScrollTracker />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.nav
        className={`relative col-start-11 col-end-13 flex h-min w-min justify-self-end ${isStacked ? "-mt-6 -mr-6 flex-col pb-8 pl-8" : "-mt-2 mr-2 flex-row"} gap-5 p-4`}
      >
        {SECTIONS.map(({ text, href }, index) => (
          <motion.div
            key={text}
            layout="position"
            transition={{
              duration: 0.4,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            <NavLink
              text={text}
              href={href}
              index={index}
              onNavigate={scrollTo}
            />
          </motion.div>
        ))}
        <AnimatePresence>
          {isStacked && (
            <>
              <motion.div
                id="menu"
                className="glass-v2 pointer-events-auto absolute inset-0 -z-1 h-full w-full"
                style={{
                  maskImage: `url(${r48Mask})`,
                  WebkitMaskImage: `url(${r48Mask})`,
                  maskSize: "200% 200%",
                  WebkitMaskSize: "200% 200%",
                  maskPosition: "bottom left",
                  WebkitMaskPosition: "bottom left",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isStacked ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <motion.div
                className="glass-v2 absolute top-0 right-full -z-1 aspect-square h-auto w-1/6 mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: isStacked ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <motion.div
                className="glass-v2 absolute top-full right-0 -z-1 aspect-square h-auto w-1/6 mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: isStacked ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

const MobileNav = ({
  scrollTo,
}: {
  scrollTo: (target: SectionHref) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-gap flex max-h-24 w-full justify-between">
      <div className="mx [pointer-events:all] relative my-4 h-min py-2">
        <a
          href="#hero"
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#hero");
          }}
        >
          <Logo className="text-foreground h-8 w-auto" />
        </a>
      </div>
      <motion.div
        className="[pointer-events:all] relative flex flex-col items-end"
        initial={{ width: 56, height: 56 }}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { width: 56, height: 56 },
          open: { width: 105, height: 230 },
        }}
      >
        <div className="pointer-events-none absolute inset-0 -z-1">
          <motion.div
            layout
            className="glass-v2 absolute size-full rounded-bl-3xl"
          />
          <motion.div
            layout="position"
            className="glass-v2 absolute top-0 right-full -z-1 aspect-square h-auto mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)]"
            initial={{ width: 20 }}
            animate={{ width: isOpen ? 36 : 20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
          <motion.div
            layout="position"
            className="glass-v2 absolute top-full right-0 -z-1 aspect-square h-auto mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)]"
            initial={{ width: 20 }}
            animate={{ width: isOpen ? 36 : 20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
        <div className="relative w-full h-200 overflow-hidden flex flex-col items-end">
          <motion.button
            type="button"
            className="relative aspect-square size-14 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <MenuIcon isOpen={isOpen} />
          </motion.button>
          <AnimatePresence>
            {isOpen && (
              <motion.nav className="absolute top-14 right-0 flex h-min w-min flex-col gap-5 px-3">
                {SECTIONS.map(({ text, href }, index) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.43, 0.13, 0.23, 0.96],
                      delay: index * 0.05,
                    }}
                  >
                    <NavLink
                      text={text}
                      href={href}
                      index={index}
                      onNavigate={scrollTo}
                    />
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const Header: React.FC = () => {
  const { scrollTo } = useLenisScroll();
  const container = useScrollContainer();
  const { scrollY } = useScroll({ container });
  const { isMobile } = useMediaQuery();
  const path = usePathname();
  const isHome = path === "/" || path.startsWith("/#");

  const { scrollYProgress } = useScroll({
    container,
    offset: [`end ${HEADER_SCROLL_START_OFFSET}`, `end ${CONTACT_HEIGHT}`],
  });

  const transform = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y = useSpring(transform, { stiffness: 400, damping: 90 });

  return (
    <motion.header
      className="pointer-events-none fixed z-50 flex w-full items-start justify-between font-sans"
      style={{ y, opacity: isHome ? 1 : 0 }}
    >
      {isMobile ? (
        <MobileNav scrollTo={scrollTo} />
      ) : (
        <DesktopNav scrollTo={scrollTo} scrollY={scrollY} />
      )}
    </motion.header>
  );
};

export default Header;
