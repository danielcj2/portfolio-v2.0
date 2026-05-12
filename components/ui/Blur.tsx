import { cn } from "@/lib/utils";

type BlurProps = React.HTMLAttributes<HTMLDivElement>;

const Blur = ({ className, ...props }: BlurProps) => {
  return (
    <div
      className={cn("relative h-12 w-full", className)}
      aria-hidden="true"
      {...props}
    >
      <div className="absolute inset-0 z-1 mask-[linear-gradient(to_bottom,rgba(0,0,0,0)_37.5%,rgba(0,0,0,1)_50%,rgba(0,0,0,1)_62.5%,rgba(0,0,0,0)_75%)] backdrop-blur-[2.5px]"></div>
      <div className="absolute inset-0 z-2 mask-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,1)_62.5%,rgba(0,0,0,1)_75%,rgba(0,0,0,0)_87.5%)] backdrop-blur-[4.5px]"></div>
      <div className="absolute inset-0 z-3 mask-[linear-gradient(to_bottom,rgba(0,0,0,0)_62.5%,rgba(0,0,0,1)_75%,rgba(0,0,0,1)_87.5%,rgba(0,0,0,0)_100%)] backdrop-blur-[9px]"></div>
      <div className="absolute inset-0 z-4 mask-[linear-gradient(to_bottom,rgba(0,0,0,0)_75%,rgba(0,0,0,1)_87.5%,rgba(0,0,0,1)_100%)] backdrop-blur-[18px]"></div>
      <div className="absolute inset-0 z-5 mask-[linear-gradient(to_bottom,rgba(0,0,0,0)_87.5%,rgba(0,0,0,1)_100%)] backdrop-blur-[36px]"></div>
    </div>
  );
};

export default Blur;
