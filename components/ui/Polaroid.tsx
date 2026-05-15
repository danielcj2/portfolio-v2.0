"use client";

import Image from "next/image";
import Card from "./Card";

type PolaroidProps = React.ComponentProps<typeof Image>;

const DEFAULT_SIZES = "(max-width: 768px) 80vw, (max-width: 1280px) 28vw, 24rem";

const Polaroid = ({ sizes, ...props }: PolaroidProps) => {
  return (
    <Card theme="light" className="h-auto w-full max-w-sm border-none p-1">
      <div className="border-foreground/8 bg-foreground/3 h-auto w-full overflow-clip rounded-xl border">
        <Image
          {...props}
          alt={props.alt || "Polaroid image"}
          placeholder="blur"
          blurDataURL="..."
          sizes={sizes ?? DEFAULT_SIZES}
          className="h-auto w-full object-cover opacity-80 grayscale"
        />
      </div>
      {props.alt && (
        <div className="mt-3 mb-2 px-2">
          <p className="text-[0.8125rem] font-semibold capitalize">
            {props.alt}
          </p>
        </div>
      )}
    </Card>
  );
};

export default Polaroid;
