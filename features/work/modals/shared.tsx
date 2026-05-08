import React from "react";
import Card from "@/ui/Card";
import { XIcon } from "@phosphor-icons/react";

type ModalHeaderProps = { name: string; year: string; onClose: () => void };

export const ModalHeader = ({ name, year, onClose }: ModalHeaderProps) => (
  <div className="flex h-min gap-2">
    <Card
      className="bg-foreground/5 flex items-center justify-between rounded-xl px-5 py-3.5"
      theme="light"
    >
      <p className="text-lg font-medium tracking-tight">{name}</p>
      <p className="font-chakra text-lg font-bold tracking-tight text-muted">
        {year}
      </p>
    </Card>
    <Card
      className="aspect-square h-full w-auto shrink-0 rounded-xl"
      theme="button"
      role="button"
      tabIndex={0}
      aria-label="Close modal"
      onClick={onClose}
    >
      <XIcon className="size-5" weight="bold" />
    </Card>
  </div>
);

export const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-foreground">{children}</span>
);

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex size-full items-center justify-center overflow-hidden">
    {children}
  </div>
);

export const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-foreground/45 text-[15px] leading-[1.6]">{children}</p>
);

export const Subheading = ({ children }: { children: string }) => (
  <p className="font-chakra text-foreground text-xs font-medium tracking-wider uppercase">
    {children}
  </p>
);

export const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="text-foreground/45 list-none text-[15px] text-pretty">
    {children}
  </ul>
);

export const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mb-2 flex gap-2">
    <span className="bg-muted-v2 mt-1.5 block size-2 min-h-2 min-w-2 [clip-path:polygon(100%_0%,0%_0%,100%_100%)]" />
    <p>{children}</p>
  </li>
);

export type ModalContentProps = {
  projectId: string;
  name: string;
  year: string;
  onClose: () => void;
};
