"use client";

import ScrollTracker from "../ui/ScrollTracker";

import {
  useScroll,
  motion,
  useMotionValueEvent,
  AnimatePresence,
  useTransform,
  useSpring,
} from "motion/react";
import { useState } from "react";
import { useLenisScroll } from "@/providers/LenisContext";
import { useScrollContainer } from "@/providers/ScrollContext";
import AnimatedLogo from "@/animations/AnimatedLogo";

type NavLinkProps = {
  text: string;
  href: SectionHref;
  index: number;
  onNavigate: (target: SectionHref) => void;
};

type SectionHref = "#work" | "#about" | "#contact";

const SECTIONS = [
  { text: "my work", href: "#work" },
  { text: "about me", href: "#about" },
  { text: "reach out", href: "#contact" },
] as const;

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

const Header: React.FC = () => {
  const { scrollTo } = useLenisScroll();
  const container = useScrollContainer();
  const { scrollY } = useScroll({ container });
  const [isStacked, setIsStacked] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsStacked(latest > 500);
  });

  const { scrollYProgress } = useScroll({
    container,
    offset: ["end 340vh", "end 240vh"],
  }); // where 240vh is height of contact section

  const transform = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y = useSpring(transform, { stiffness: 400, damping: 90 });

  return (
    <motion.header
      className="pointer-events-none fixed z-50 flex w-full items-start justify-between pt-8 font-sans"
      style={{ y }}
    >
      <div className="mx grid-12 w-full">
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
                  className="bg-background-v2/90 mask-200 absolute inset-0 -z-1 h-full w-full backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isStacked ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <motion.div
                  className="bg-background-v2/90 absolute top-0 right-full -z-1 aspect-square h-auto w-1/6 mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)] backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isStacked ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <motion.div
                  className="bg-background-v2/90 absolute top-full right-0 -z-1 aspect-square h-auto w-1/6 mask-[radial-gradient(circle_at_bottom_left,transparent_69%,black_70%)] backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isStacked ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;
