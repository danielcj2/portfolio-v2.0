"use client";

import Image from "next/image";
import Card from "@/ui/Card";

const r2Url = process.env.NEXT_PUBLIC_BLUEWAVE;

const BluewaveLogo = () => {
  return (
    <Card className="col-span-2 row-span-4 hidden overflow-hidden xl:block">
      <div className="group relative h-full w-full bg-[#2179ca] bg-[radial-gradient(at_39%_49%,#2179ca_0px,transparent_50%),radial-gradient(at_16%_75%,#1b998b_0px,transparent_50%),radial-gradient(at_24%_94%,#a8d1d1_0px,transparent_50%),radial-gradient(at_11%_35%,#fd5959_0px,transparent_50%),radial-gradient(at_86%_74%,#f4d06f_0px,transparent_50%)]">
        <Image
          src={`${r2Url}/logo.png`}
          alt="Bluewave Labs Logo"
          className="pointer-events-none absolute inset-0 m-auto transition-transform duration-500 ease-in-out select-none group-hover:scale-115"
          width={125}
          height={125}
        />
      </div>
    </Card>
  );
};

export default BluewaveLogo;
