import HeadingTranslate from "@/animations/HeadingTranslate";
import LogoSpin from "@/animations/LogoSpin";
import TextFlip from "@/components/animations/TextFlip";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <div className="flex justify-center gap-1 uppercase md:gap-0">
        <HeadingTranslate
          className="min-w-0 text-right font-mono text-[clamp(1rem,18vw,8rem)] font-light tracking-tighter"
          direction="left"
          text="Not"
        />
        <LogoSpin
          className="translate-x-1"
          text="I am still spinning ✦ don't mind me ✦"
        />
        <HeadingTranslate
          className="min-w-0 text-[clamp(1rem,18vw,8rem)] font-medium italic"
          direction="right"
          text="Found"
        />
      </div>
      <Link
        href="/"
        className="text-muted-v2 font-chakra bg-background mt-1 flex cursor-pointer justify-between gap-2 text-base font-bold tracking-wider uppercase md:mt-0"
      >
        <TextFlip>Return Home &#8594;</TextFlip>
      </Link>
    </div>
  );
}
