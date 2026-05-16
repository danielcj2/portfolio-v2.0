import Card from "./Card";
import Image from "next/image";

type PolaroidProps = React.ComponentProps<typeof Image>;

const Polaroid = ({ ...props }: PolaroidProps) => {
  return (
    <Card theme="light" className="h-auto w-full max-w-sm border-none p-1">
      <div className="border-foreground/8 bg-foreground/3 h-auto w-full overflow-clip rounded-xl border">
        <Image
          {...props}
          alt={props.alt || "Polaroid image"}
          loading="eager"
          placeholder="empty"
          className="h-auto w-full object-cover opacity-80 grayscale"
          sizes="(max-width: 768px) 80vw, (max-width: 1280px) 28vw, 24rem"
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
