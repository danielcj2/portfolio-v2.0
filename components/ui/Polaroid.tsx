"use client";

import Image, { StaticImageData } from "next/image";
import Card from "./Card";

type PolaroidProps = {
  image: StaticImageData | string;
  caption?: string;
};

const Polaroid = ({ image, caption }: PolaroidProps) => {
  return (
    <Card theme="light" className="h-auto w-full max-w-sm border-none p-1">
      <div className="border-foreground/8 bg-foreground/3 h-auto w-full overflow-clip rounded-xl border">
        <Image
          src={image}
          alt={caption || "Polaroid image"}
          className="h-auto w-full object-cover opacity-80 grayscale"
        />
      </div>
      {caption && (
        <div className="mt-3 mb-2 px-2">
          <p className="text-[0.8125rem] font-semibold capitalize">{caption}</p>
        </div>
      )}
    </Card>
  );
};

export default Polaroid;
