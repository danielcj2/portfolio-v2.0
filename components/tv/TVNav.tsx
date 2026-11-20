import Logo from "@/images/logo.svg";

import Link from "next/link";
import TVButton from "./TVButton";

import { cn } from "@/lib/utils";
import { useLenisScroll } from "@/lib/useLenisScroll";
import { EnvelopeIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

const CHANNEL_BARS = Array.from(
  { length: 14 },
  (_, index) => `bar-${index + 1}`,
);

const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";
const emailHref = process.env.NEXT_PUBLIC_EMAIL_URL ?? "";

export const Wrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "pointer-events-auto h-28 w-min justify-self-end overflow-hidden rounded-2xl bg-[#545454]/80 p-1.5 shadow-[inset_-12px_-12px_6px_#8c8c8c]",
      className,
    )}
  >
    <div className="bg-background flex h-full w-min gap-1 overflow-hidden rounded-xl px-1 py-1">
      {children}
    </div>
  </div>
);

const TVNav = ({ buttons }: { buttons?: React.ReactNode }) => {
  const { navigateTo } = useLenisScroll();
  const shouldReduceMotion = useReducedMotion();

  const handleNav = (event: { preventDefault: () => void }, target: string) => {
    event.preventDefault();
    navigateTo(target);
  };

  return (
    <motion.div className="tv-nav absolute -inset-x-1/3 bottom-0 grid h-64 grid-cols-[auto_auto_1fr] items-center gap-4 px-18 md:inset-x-0 md:px-32 lg:grid-cols-[auto_auto_1fr_auto] xl:grid-cols-[auto_auto_1fr_auto_auto]">
      <Link
        className="pointer-events-auto ml-auto cursor-pointer md:mr-auto"
        href="/"
        onClick={(event) => handleNav(event, "#hero")}
      >
        <Logo
          className="h-26 w-auto text-[#959595]/20"
          style={{
            filter:
              "drop-shadow(2px 10px 2px #4c4c4c) drop-shadow(-2px -10px 2px #8c8c8c)",
          }}
        />
      </Link>
      <div className="ml-8 h-9 w-14 overflow-hidden rounded-xl bg-[#545454]/80 px-1.5 py-1.5 shadow-[inset_-12px_-12px_6px_#8c8c8c]">
        <div className="bg-background flex h-full w-full gap-1 overflow-hidden rounded-lg px-0.5 py-0.5">
          <motion.div
            className="bg-accent border-background-v2 border-px relative flex h-full w-full items-center overflow-hidden rounded-md shadow-[inset_-5px_-5px_10px_#c64a42,inset_5px_5px_10px_#ff7468]"
            initial={{ opacity: 0.95 }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.95 }
                : {
                    opacity: [0.95, 0.95, 0.2, 0.95, 0.95, 0.4, 0.95],
                  }
            }
            transition={{
              duration: 7.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.58, 0.64, 0.72, 0.9, 0.95, 1],
            }}
          ></motion.div>
        </div>
      </div>
      <div className="hidden h-full gap-2 justify-self-center pt-16 xl:flex">
        {CHANNEL_BARS.map((barId) => (
          <div
            key={barId}
            className="h-full w-4 overflow-hidden rounded-t-lg bg-[#545454] px-1 pt-1 shadow-[inset_-4px_-2px_6px_#8c8c8c] xl:last-of-type:hidden xl:nth-[-n+5]:hidden 2xl:last-of-type:block 2xl:nth-[-n+5]:block"
          >
            <div className="bg-background/80 flex h-full w-full gap-1 overflow-hidden rounded-t-md shadow-[inset_2px_4px_2px_#0f0f0f,inset_-5px_-5px_10px_#343434]" />
          </div>
        ))}
      </div>
      {!!buttons ? (
        buttons
      ) : (
        <>
          <Wrapper className="hidden lg:block">
            <TVButton
              as="a"
              href="/#work"
              onClick={(event) => handleNav(event, "#work")}
            >
              <p className="text-background font-mono text-[38px] font-semibold tracking-[-0.015em] text-nowrap uppercase">
                Work
              </p>
            </TVButton>
            <TVButton
              as="a"
              href="/#about"
              onClick={(event) => handleNav(event, "#about")}
            >
              <p className="text-background font-mono text-[38px] font-semibold tracking-[-0.015em] text-nowrap uppercase">
                About me
              </p>
            </TVButton>
          </Wrapper>
          <Wrapper>
            <TVButton
              as="a"
              aspect="square"
              href={emailHref}
              aria-label="Email"
            >
              <EnvelopeIcon
                className="text-background h-16 w-16"
                weight="duotone"
                style={{ filter: "drop-shadow(0px 0px 4px #4c4c4c)" }}
              />
            </TVButton>
            <TVButton
              as="a"
              aspect="square"
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinLogoIcon
                className="text-background h-16 w-16"
                weight="duotone"
                style={{ filter: "drop-shadow(0px 0px 4px #4c4c4c)" }}
              />
            </TVButton>
          </Wrapper>
        </>
      )}
    </motion.div>
  );
};

export default TVNav;
