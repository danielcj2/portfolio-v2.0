import {
  AnimatePresence,
  EventInfo,
  motion,
  useAnimate,
  type Variants,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import { weatherMap, getIcon, getMood } from "@/lib/weather";

import Image from "next/image";
import Card from "@/ui/Card";

import tower from "@/images/cn_tower.png";
import cloud from "@/images/cloud.png";
import TypingIndicator from "@/animations/TypingIndicator";

type Message = {
  text: string;
  highlight?: string;
};

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=43.3833&longitude=-79.2314&current_weather=true";

type CloudLayer = {
  wrapperClass: string;
  imageClass: string;
  variants: Variants;
};

const transition = {
  duration: 8,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

const cloudLayers: CloudLayer[] = [
  {
    wrapperClass: "top-[4%] -left-[9%] opacity-10",
    imageClass: "h-[50%] w-auto object-cover",
    variants: {
      initial: { y: 0, x: 0 },
      hovered: {
        y: [0, -15, -5, -15, 0],
        x: [0, 5, -3, 5, 0],
        transition,
      },
    },
  },
  {
    wrapperClass: "top-[8%] -right-[35%] -scale-x-100 opacity-10",
    imageClass: "h-[30%] w-auto object-cover",
    variants: {
      initial: { x: 0, y: 0 },
      hovered: {
        x: [0, -20, 0],
        y: [0, -8, -3, -8, 0],
        transition,
      },
    },
  },
  {
    wrapperClass: "top-[44%] -left-[8%] opacity-10",
    imageClass: "h-[15%] w-auto object-cover",
    variants: {
      initial: { x: 0, y: 0, rotate: 0 },
      hovered: {
        x: [0, 10, 3, 10, 0],
        y: [0, -5, 0, -5, 0],
        rotate: [0, 2, -1, 2, 0],
        transition,
      },
    },
  },
];

const CNTower = () => {
  const [scope, animate] = useAnimate();
  const towerRef = useRef<HTMLDivElement>(null);
  const hasRequestedWeather = useRef(false);
  const isTowerBouncing = useRef(false);

  // Stage progression:
  // 0 = nothing revealed
  // 1 = first text revealed
  // 2 = second bubble appears with dots
  // 3 = second text revealed
  // 4 = third bubble appears, etc.
  // ODD = text revealed, EVEN = dots shown
  const [revealStage, setRevealStage] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Fetching weather..." },
  ]);

  useEffect(() => {
    if (revealStage === 0 || revealStage >= messages.length * 2) return;

    const delay = 1000;
    const timer = setTimeout(() => setRevealStage((s) => s + 1), delay);
    return () => clearTimeout(timer);
  }, [revealStage, messages.length]);

  const handleReveal = async () => {
    if (hasRequestedWeather.current) return;

    hasRequestedWeather.current = true;

    await fetch(WEATHER_URL)
      .then((res) => res.json())
      .then((data) => {
        const cur = data.current_weather;
        const isDay = cur.is_day === 1;
        const weatherLabel = weatherMap[cur.weathercode] ?? "Weather";
        const weatherIcon = getIcon(cur.weathercode, isDay);

        setMessages([
          { text: `Currently`, highlight: `${cur.temperature}°C` },
          { text: `${weatherLabel} ${weatherIcon}` },
          { text: getMood(cur.weathercode, isDay) },
        ]);
      })
      .then(() => revealStage === 0 && setRevealStage(1))
      .catch(() => {
        setMessages([{ text: "Weather unavailable 🌨️" }]);
        if (revealStage === 0) setRevealStage(1);
      });
  };

  const getBubbleState = (index: number) => ({
    show: index === 0 || revealStage >= index * 2,
    revealed: revealStage >= index * 2 + 1,
  });

  const handleTowerHover = async (_: MouseEvent, info: EventInfo) => {
    if (!towerRef.current || isTowerBouncing.current) return;

    isTowerBouncing.current = true;

    const rect = towerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const fromLeft = info.point.x < centerX;
    const direction = fromLeft ? 1 : -1;

    try {
      await animate(
        towerRef.current,
        {
          rotate: [
            0,
            direction * 8,
            direction * -6,
            direction * 4,
            direction * -2.5,
            direction * 1.25,
            direction * -0.6,
            0,
          ],
        },
        { duration: 2.5, ease: "easeOut" },
      );
    } finally {
      isTowerBouncing.current = false;
    }
  };

  return (
    <Card
      className="border-muted/10 col-start-1 col-end-4 row-span-7 xl:col-end-3"
      initial="initial"
      whileHover="hovered"
      onHoverStart={handleReveal}
    >
      <div className="relative h-full w-full overflow-hidden" ref={scope}>
        <motion.div
          layout="preserve-aspect"
          className="absolute bottom-4 left-4 z-1 flex flex-col gap-1.5 font-mono text-[0.8125rem] [overflow-anchor:none]"
        >
          {messages.map((message, index) => {
            const { show, revealed } = getBubbleState(index);
            if (!show) return null;

            return (
              <motion.div
                key={index}
                className="bg-foreground/5 flex h-8 w-max items-center rounded-2xl rounded-bl-none px-3 pt-0.5 tracking-wide text-nowrap backdrop-blur-sm"
                initial={index === 0 ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AnimatePresence>
                  {revealed && (
                    <motion.span
                      className="inline-flex origin-left gap-1"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {message.text}
                      {message.highlight && (
                        <span className="font-semibold">
                          {message.highlight}
                        </span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!revealed && <TypingIndicator />}
              </motion.div>
            );
          })}
        </motion.div>
        {cloudLayers.map(({ wrapperClass, imageClass, variants }) => (
          <motion.div
            key={wrapperClass}
            aria-hidden="true"
            className={`pointer-events-none absolute h-full w-auto ${wrapperClass}`}
            variants={variants}
          >
            <Image
              src={cloud}
              alt=""
              className={imageClass}
              sizes="8vw"
              width={690}
              height={460}
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
          </motion.div>
        ))}
        <motion.div
          className="absolute right-8 bottom-0 h-[82%] w-auto"
          onHoverStart={handleTowerHover}
        >
          <motion.div ref={towerRef} className="h-full w-full origin-bottom">
            <Image
              src={tower}
              alt="CN Tower"
              className="h-full w-full opacity-80"
              sizes="12vw"
              width={102}
              height={460}
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
          </motion.div>
          <div className="bg-background/60 pointer-events-none absolute inset-0 mix-blend-color" />
        </motion.div>
      </div>
    </Card>
  );
};

export default CNTower;
