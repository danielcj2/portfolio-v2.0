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
      <div className="flex flex-wrap justify-center gap-4 uppercase">
        <HeadingTranslate
          className="min-w-0 text-right font-mono text-[clamp(1rem,10vw,6rem)] font-light tracking-tighter"
          direction="left"
          text="Something"
        />
        <LogoSpin
          className="translate-x-3.5"
          text="I am still spinning ✦ don't mind me ✦"
        />
        <HeadingTranslate
          className="min-w-0 text-[clamp(1rem,10vw,6rem)] font-medium italic"
          direction="right"
          text="Went Wrong"
        />
      </div>
      <Button
        className="font-chakra text-background h-12 text-base font-bold tracking-wider text-nowrap uppercase md:h-14 md:text-lg"
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
