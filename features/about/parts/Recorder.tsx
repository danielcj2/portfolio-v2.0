"use client";

import disk from "@/images/disk.png";
import song from "@/images/pixelated_kisses.jpg";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";

import Image from "next/image";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

type RecorderDiskProps = {
  diskRotation: MotionValue<number>;
  progress: MotionValue<number>;
};
type PlayButtonProps = { playing: boolean; onClick: () => void };
type RecorderArmProps = {
  armEngaged: boolean;
  onClick: () => void;
  onAnimationComplete: () => void;
};

const RecorderDisk = ({ diskRotation, progress }: RecorderDiskProps) => (
  <div
    className="h-auto w-auto rounded-full bg-neutral-900 p-0.75"
    style={{ boxShadow: "0px 0px 6px #090909" }}
  >
    <div
      className="bg-background-v2 relative h-auto w-auto rounded-full p-2"
      style={{ boxShadow: "inset 2px 2px 10px #060606" }}
    >
      <svg
        className="pointer-events-none absolute inset-0 -rotate-90 fill-none"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <motion.circle
          cx="50%"
          cy="50%"
          r="48%"
          pathLength="1"
          className="stroke-foreground fill-none stroke-[0.75px]"
          style={{ pathLength: progress, strokeDashoffset: 0 }}
        />
      </svg>
      <div className="bg-background pointer-events-none relative aspect-square h-auto w-48 overflow-clip rounded-full border border-neutral-900 select-none">
        <motion.div className="size-full" style={{ rotate: diskRotation }}>
          <Image
            src={song}
            alt="Pixelated Kisses"
            className="size-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0">
          <Image src={disk} alt="" className="size-full object-cover" />
        </div>
      </div>
      <div className="center-xy bg-background-v2 rounded-full p-1">
        <div
          className="bg-muted size-1.5 rounded-full"
          style={{
            boxShadow: "inset 2px -2px 3px #3c3c3c, inset -5px 5px 3px #f0f0f0",
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  </div>
);

const PlayButton = ({ playing, onClick }: PlayButtonProps) => (
  <motion.button
    className="bg-muted-v2/80 absolute bottom-4 left-3 cursor-pointer rounded-full p-1.75"
    initial={{ boxShadow: "0 0 10px #060606" }}
    whileFocus={{
      boxShadow:
        "0 0 10px #060606, inset 2px 2px 3px #1f1f1f, inset -2px -2px 3px #7d7d7d",
    }}
    whileTap={{
      boxShadow:
        "0 0 10px #060606, inset 2px 2px 3px #1f1f1f, inset -2px -2px 3px #7d7d7d",
    }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    onClick={onClick}
    aria-label={playing ? "Pause" : "Play"}
  >
    {playing ? (
      <PauseIcon
        className="text-foreground size-2.5"
        weight="fill"
        style={{ filter: "drop-shadow(-1px 1px 4px #c4c4c4)" }}
      />
    ) : (
      <PlayIcon
        className="text-foreground size-2.5"
        weight="fill"
        style={{ filter: "drop-shadow(-1px 1px 4px #c4c4c4)" }}
      />
    )}
  </motion.button>
);

const RecorderArm = ({
  armEngaged,
  onClick,
  onAnimationComplete,
}: RecorderArmProps) => (
  <motion.div
    className="bg-muted-v2 absolute top-6 right-4 h-auto w-auto cursor-grab rounded-full py-3.5 pr-3 pl-4"
    onClick={onClick}
    onPointerDown={onClick}
    animate={{ rotate: armEngaged ? 32 : 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    onAnimationComplete={onAnimationComplete}
    style={{ boxShadow: "-1px -1px 4px #0b0b0b, 1px 1px 4px #0b0b0b" }}
  >
    <div
      className="bg-muted-v2 border-background/30 relative size-7 rounded-full border"
      style={{
        boxShadow:
          "-7px 3px 4px #222222, 6px -6px 4px #616161, inset 2px 2px 2px #616161",
      }}
    >
      {/* TOP */}
      <div
        className="bg-background-v2 border-background-v2 absolute bottom-full left-1/2 h-4 w-2 -translate-x-1/2 border-l-3"
        style={{
          boxShadow: "inset 2px 1px 2px #424242, -4px 1px 10px #060606",
        }}
      >
        <div
          className="bg-background-v2 border-background-v2 absolute bottom-0 -left-1 h-1.5 w-2.5 border-l-3"
          style={{ boxShadow: "inset 2px 1px 2px #424242" }}
        />
        <div
          className="bg-background-v2 border-background-v2 absolute bottom-full -left-1.5 h-0.5 w-3 border-l-3"
          style={{ boxShadow: "inset 2px 0px 2px #424242" }}
        >
          <div
            className="bg-background-v2 border-background-v2 absolute bottom-full -left-1.5 h-3.75 w-5 border-l-7"
            style={{
              boxShadow: "inset 3px 0 1px #424242, -8px 1px 10px #101010",
            }}
          >
            <div className="bg-muted-v2 absolute bottom-1 left-px size-1.5 rounded-full" />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className="bg-background-v2 border-background-v2 absolute top-full left-1/2 h-30 w-2 -translate-x-1/2 border-l-3"
        style={{ boxShadow: "inset 2px 1px 2px #424242, -4px 0 10px #060606" }}
      >
        <div
          className="bg-background-v2 border-background-v2 absolute top-0 -left-1 h-2 w-2.5 border-l-3"
          style={{ boxShadow: "inset 2px 1px 2px #424242" }}
        />
        <div
          className="bg-background-v2 border-background-v2 absolute bottom-0 -left-1 h-3 w-2.5 border-l-3"
          style={{
            boxShadow: "inset 2px 1px 2px #424242, -4px 0 10px #060606",
          }}
        />
        <div
          className="bg-muted-v2 border-background/30 absolute top-full -left-1.5 h-5 w-3.5 border"
          style={{
            boxShadow: "inset 2px 2px 2px #616161, -4px 4px 10px #060606",
          }}
        >
          <div
            className="bg-muted-v2 border-background/30 absolute top-1/2 -left-1.5 h-6.5 w-4.5 rotate-45 rounded-sm border"
            style={{
              boxShadow: "inset 1px 1px 2px #616161, -4px 8px 16px #060606",
            }}
          >
            <div className="bg-background absolute bottom-0.75 left-px rounded-sm px-px py-0.75">
              <div
                className="bg-muted h-1 w-0.5 rounded-full"
                style={{
                  boxShadow:
                    "inset 1px -1px 1px #3c3c3c, inset -1px 1px 1px #c4c4c4",
                }}
              />
            </div>
            <div className="bg-background absolute right-px bottom-0.75 rounded-sm px-px py-0.75">
              <div
                className="bg-muted h-1 w-0.5 rounded-full"
                style={{
                  boxShadow:
                    "inset 1px -1px 1px #3c3c3c, inset -1px 1px 1px #c4c4c4",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Recorder = () => {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [armEngaged, setArmEngaged] = useState<boolean>(false);
  const [isArmTransitioning, setIsArmTransitioning] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const diskRotation = useMotionValue(0);
  const progress = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (!playing) return;

    const degreesPerMs = 360 / 20000;
    const nextRotation = (diskRotation.get() + delta * degreesPerMs) % 360;
    diskRotation.set(nextRotation);
  });

  useEffect(() => {
    if (!audio.current) {
      audio.current = new Audio(
        "https://pub-1ad1c6ec67ef4751b038ab44f23fd40c.r2.dev/pixelated.m4a",
      );
      audio.current.crossOrigin = "anonymous";
    }

    const el = audio.current;
    const timeUpdate = () => setCurrentTime(el.currentTime);
    const loadedMetadata = () => {
      setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    };

    el.addEventListener("timeupdate", timeUpdate);
    el.addEventListener("loadedmetadata", loadedMetadata);
    if (el.readyState >= 1) loadedMetadata();

    return () => {
      el.removeEventListener("timeupdate", timeUpdate);
      el.removeEventListener("loadedmetadata", loadedMetadata);
      el.pause();
      audio.current = null;
    };
  }, []);

  const handleAudioEnded = useCallback(() => {
    setPlaying(false);
    setArmEngaged(false);
    setCurrentTime(0);
  }, []);

  useEffect(() => {
    const next = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
    progress.set(next);
  }, [currentTime, duration, progress]);

  const startPlayback = async () => {
    if (!audio.current) return;

    try {
      await audio.current.play();
      audio.current.removeEventListener("ended", handleAudioEnded);
      audio.current.addEventListener("ended", handleAudioEnded);
      setPlaying(true);
    } catch {
      setArmEngaged(false);
    } finally {
      setIsArmTransitioning(false);
    }
  };

  const handlePlayPause = () => {
    if (!audio.current || isArmTransitioning) return;

    if (playing) {
      audio.current.pause();
      audio.current.removeEventListener("ended", handleAudioEnded);
      setPlaying(false);
      setArmEngaged(false);
      return;
    }

    setIsArmTransitioning(true);
    setArmEngaged(true);
  };

  return (
    <div
      className="relative h-auto w-min rounded-4xl border-2 border-neutral-900 bg-neutral-900 py-3 pr-16 pl-2"
      style={{
        boxShadow: "inset -1px -1px 2px #0b0b0b, inset 1px 1px 2px #0b0b0b",
      }}
    >
      <div className="absolute top-4.5 left-3.5 z-1">
        <p className="text-muted-v2 text-xs font-semibold tracking-wider">
          Joji
        </p>
      </div>

      <RecorderDisk diskRotation={diskRotation} progress={progress} />
      <PlayButton playing={playing} onClick={handlePlayPause} />
      <RecorderArm
        armEngaged={armEngaged}
        onClick={handlePlayPause}
        onAnimationComplete={() => {
          if (isArmTransitioning && armEngaged && !playing) {
            void startPlayback();
          }
        }}
      />
    </div>
  );
};

export default Recorder;
