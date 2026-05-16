import { EventInfo, motion, useAnimate, type Variants } from "motion/react";
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
    wrapperClass: "top-5 -left-10 opacity-10",
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
    wrapperClass: "top-10 -right-25 -scale-x-100 opacity-10",
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
    wrapperClass: "top-55 -left-5 opacity-10",
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

  const handleTowerHover = (_: MouseEvent, info: EventInfo) => {
    if (!towerRef.current) return;

    const rect = towerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const fromLeft = info.point.x < centerX;
    const direction = fromLeft ? 1 : -1;

    animate(
      towerRef.current,
      {
        rotate: [
          0,
          direction * 5,
          direction * -4,
          direction * 2.5,
          direction * -1.5,
          direction * 0.8,
          direction * -0.4,
          0,
        ],
      },
      { duration: 2.5, ease: "easeOut" },
    );
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
          className="font-chakra absolute bottom-4 left-4 z-1 flex flex-col gap-1.5 text-[0.8125rem] [overflow-anchor:none]"
        >
          {messages.map((message, index) => {
            const { show, revealed } = getBubbleState(index);
            if (!show) return null;

            return (
              <motion.div
                key={index}
                className="bg-foreground/5 flex h-8 w-max items-center rounded-2xl rounded-bl-none px-3 tracking-wider text-nowrap backdrop-blur-sm"
                initial={index === 0 ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.span
                  className="inline-flex gap-1"
                  initial={{ opacity: 0, width: 0 }}
                  animate={
                    revealed
                      ? { opacity: 1, width: "auto" }
                      : { opacity: 0, width: 0 }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {message.text}
                  {message.highlight && (
                    <span className="font-semibold">{message.highlight}</span>
                  )}
                </motion.span>
                <motion.div
                  initial={{ opacity: 1, width: "auto" }}
                  animate={
                    revealed
                      ? { opacity: 0, width: 0 }
                      : { opacity: 1, width: "auto" }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <TypingIndicator />
                </motion.div>
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
            <Image src={cloud} alt="" className={imageClass} sizes="8vw" />
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
            />
          </motion.div>
          <div className="bg-background/60 pointer-events-none absolute inset-0 mix-blend-color" />
        </motion.div>
      </div>
      <motion.div
        className="text-muted-v2 font-chakra pointer-events-none absolute top-1/2 -left-3.75 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[0.625rem] font-bold tracking-wider whitespace-nowrap uppercase"
        variants={{ initial: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        Hover to lean the tower of Pisa... erm Canada!
      </motion.div>
    </Card>
  );
};

export default CNTower;
