"use client";

import HeadingTranslate from "@/animations/HeadingTranslate";
import LogoSpin from "@/animations/LogoSpin";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <div className="flex justify-center gap-1 uppercase md:gap-0">
        <HeadingTranslate
          className="min-w-0 text-right font-mono text-[clamp(1rem,18vw,6rem)] font-light tracking-tighter"
          direction="left"
          text="Something"
        />
        <LogoSpin
          className="translate-x-4"
          text="I am still spinning ✦ don't mind me ✦"
        />
        <HeadingTranslate
          className="min-w-0 text-[clamp(1rem,18vw,6rem)] font-medium italic"
          direction="right"
          text="Went Wrong"
        />
      </div>
      <Button
        className="font-chakra text-background h-14 text-lg font-bold tracking-wider text-nowrap uppercase"
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => unstable_retry()
        }
      >
        Try again
      </Button>
    </div>
  );
}
