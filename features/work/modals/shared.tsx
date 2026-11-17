import React from "react";
import Card from "@/ui/Card";
import { XIcon } from "@phosphor-icons/react";

type ModalHeaderProps = { name: string; year: string; onClose: () => void };

export const ModalHeader = ({ name, year, onClose }: ModalHeaderProps) => (
  <div className="flex h-min gap-2">
    <Card
      className="bg-foreground/5 flex items-baseline justify-between rounded-xl px-5 pt-3.5 pb-3"
      theme="light"
    >
      <p className="text-lg tracking-[0.03em]">{name}</p>
      <p className="text-foreground/28 font-mono text-lg font-medium tracking-tight">
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
  <p className="text-[14.5px] leading-relaxed font-medium tracking-wider text-[#686868]">
    {children}
  </p>
);

export const Subheading = ({ children }: { children: string }) => (
  <p className="text-foreground font-mono text-[0.8125rem] font-medium tracking-wider uppercase">
    {children}
  </p>
);

export const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="">{children}</ul>
);

export const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mb-2 flex list-none gap-2">
    <span className="bg-muted mt-1.75 block size-1.25 shrink-0 self-baseline" />
    <Paragraph>{children}</Paragraph>
  </li>
);

export type ModalContentProps = {
  projectId: string;
  name: string;
  year: string;
  onClose: () => void;
};
