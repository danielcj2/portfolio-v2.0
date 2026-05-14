import Logo from "@/images/logo.svg";
import Button from "@/ui/Button";
import { useLenisScroll } from "@/providers/LenisContext";
import { EnvelopeIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

const CHANNEL_BARS = Array.from(
  { length: 14 },
  (_, index) => `bar-${index + 1}`,
);

const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";
const emailHref = process.env.NEXT_PUBLIC_EMAIL_URL ?? "";

const TVButtons = () => {
  const { scrollTo } = useLenisScroll();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute bottom-0 left-0 grid h-64 w-full grid-cols-[0.5fr_auto_1fr] items-center gap-4 px-32 md:grid-cols-[auto_auto_1fr_auto_auto]">
      <Logo
        className="text-muted/20 ml-auto h-26 w-auto md:mr-auto"
        style={{
          filter:
            "drop-shadow(2px 10px 2px #4c4c4c) drop-shadow(-2px -10px 2px #8c8c8c)",
        }}
      />
      <div
        className="bg-muted-v2/80 ml-8 h-9 w-14 overflow-hidden rounded-xl px-1.5 py-1.5"
        style={{ boxShadow: "inset -12px -12px 6px #8c8c8c" }}
      >
        <div className="bg-background flex h-full w-full gap-1 overflow-hidden rounded-lg px-0.5 py-0.5">
          <motion.div
            className="bg-accent border-background-v2 border-px relative flex h-full w-full items-center overflow-hidden rounded-md"
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
            style={{
              boxShadow:
                "inset -5px -5px 10px #c64a42, inset 5px 5px 10px #ff7468",
            }}
          ></motion.div>
        </div>
      </div>
      <div className="hidden h-full gap-2 justify-self-center pt-16 xl:flex">
        {CHANNEL_BARS.map((barId) => (
          <div
            key={barId}
            className="bg-muted-v2 h-full w-4 overflow-hidden rounded-t-lg px-1 pt-1 xl:first-of-type:hidden xl:last-of-type:hidden xl:nth-of-type-[2]:hidden 2xl:first-of-type:block 2xl:last-of-type:block 2xl:nth-of-type-[2]:block"
            style={{
              boxShadow: "inset -4px -2px 6px #8c8c8c",
            }}
          >
            <div
              className="bg-background/80 flex h-full w-full gap-1 overflow-hidden rounded-t-md"
              style={{
                boxShadow:
                  "inset 2px 4px 2px #0f0f0f, inset -5px -5px 10px #343434",
              }}
            />
          </div>
        ))}
      </div>
      <div
        className="bg-muted-v2/80 pointer-events-auto hidden h-28 w-min justify-self-end overflow-hidden rounded-2xl px-1.5 py-1.5 md:block"
        style={{
          boxShadow: "inset -12px -12px 6px #8c8c8c",
        }}
      >
        <div className="bg-background flex h-full w-min gap-1 overflow-hidden rounded-xl px-1 py-1">
          <Button onClick={() => scrollTo("#work")}>
            <p className="font-chakra text-background text-4xl font-bold tracking-wider text-nowrap uppercase">
              Work
            </p>
          </Button>
          <Button onClick={() => scrollTo("#about")}>
            <p className="font-chakra text-background text-4xl font-bold tracking-wider text-nowrap uppercase">
              About me
            </p>
          </Button>
        </div>
      </div>
      <div
        className="bg-muted-v2/80 md:mx-none pointer-events-auto mx-auto h-28 w-min overflow-hidden rounded-2xl px-1.5 py-1.5"
        style={{
          boxShadow: "inset -12px -12px 6px #8c8c8c",
        }}
      >
        <div className="bg-background flex h-full w-min gap-1 overflow-hidden rounded-xl px-1 py-1">
          <Button as="a" aspect="square" href={emailHref} aria-label="Email">
            <EnvelopeIcon
              className="text-background h-16 w-16"
              weight="duotone"
              style={{
                filter:
                  "drop-shadow(2px 2px 2px #4c4c4c) drop-shadow(-2px -2px 2px #8c8c8c)",
              }}
            />
          </Button>
          <Button
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
              style={{
                filter:
                  "drop-shadow(2px 2px 2px #4c4c4c) drop-shadow(-2px -2px 2px #8c8c8c)",
              }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TVButtons;
