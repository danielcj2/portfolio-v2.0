"use client";

import Polaroid from "@/ui/Polaroid";
import Blur from "@/components/ui/Blur";

const r2Url = process.env.NEXT_PUBLIC_PORTFOLIO;

export const Photo1 = () => {
  return (
    <Polaroid
      src={`${r2Url}/spider.jpg`}
      alt="Spider and man"
      width={1500}
      height={2000}
    />
  );
};

export const Photo2 = () => {
  return (
    <Polaroid
      src={`${r2Url}/thejump.jpg`}
      width={1620}
      height={2160}
      alt="July 31, 2025 — The jump"
    />
  );
};

export const Photo4 = () => {
  return (
    <Polaroid
      src={`${r2Url}/suit.png`}
      alt="Jungle hair jumpscare"
      width={896}
      height={1195}
    />
  );
};

const Album = () => {
  return (
    <div className="absolute inset-0">
      <div
        className="grid-12 mx relative h-full py-32"
        style={{ gap: 0, gridTemplateRows: "repeat(5, minmax(0, 1fr))" }}
      >
        <div className="col-start-1 col-end-4 xl:col-start-2">
          <Photo1 />
        </div>
        <div className="col-start-1 col-end-4 row-start-2 self-center xl:col-end-3">
          <Photo2 />
        </div>
        <div className="col-start-2 col-end-5 row-start-3 self-center xl:col-start-3">
          <Polaroid
            src={`${r2Url}/monkeh.jpg`}
            alt="My spirit animal"
            width={2160}
            height={2880}
          />
        </div>
        <div className="col-start-1 col-end-4 row-start-4 self-center xl:col-end-3">
          <Photo4 />
        </div>
        <div className="col-start-1 col-end-4 row-start-5 mb-8 self-end">
          <Polaroid
            src={`${r2Url}/zipline.jpg`}
            alt="Next mission: the clouds"
            width={1206}
            height={681}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-2 h-auto w-full">
          <Blur className="-scale-y-100" />
        </div>
      </div>
    </div>
  );
};

export default Album;
