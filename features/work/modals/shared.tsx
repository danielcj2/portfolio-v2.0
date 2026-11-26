import React from "react";
import Card from "@/ui/Card";
import { XIcon } from "@phosphor-icons/react";

type ModalHeaderProps = { name: string; year: string; onClose: () => void };

export const ModalHeader = ({ name, year, onClose }: ModalHeaderProps) => (
  <div className="flex h-min gap-2">
    <Card
      className="bg-foreground/8 flex items-baseline justify-between rounded-xl px-5 pt-3.5 pb-3"
      theme="light"
    >
      <p className="text-lg tracking-[0.03em]">{name}</p>
      <p className="font-mono text-lg font-semibold text-[#747474]">{year}</p>
    </Card>
    <Card
      className="hover:bg-foreground/4 active:bg-foreground/8 hover:text-foreground border-foreground/5 bg-foreground/2 flex aspect-square h-full w-auto shrink-0 cursor-pointer items-center justify-center rounded-xl border text-[#959595] transition-colors duration-200"
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
  <p className="text-[0.9rem] leading-relaxed tracking-wider text-[#747474]">
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
    <span className="bg-foreground/50 mt-1.75 block size-1.25 shrink-0 self-baseline" />
    <Paragraph>{children}</Paragraph>
  </li>
);

export const TechStack = ({ tools }: { tools: string[] }) => (
  <span className="flex flex-wrap gap-2 gap-y-1.25 text-[0.9rem] leading-snug tracking-wider text-[#747474]">
    {tools.map((tool, index) => (
      <React.Fragment key={index}>
        <span>{tool}</span>
        {index < tools.length - 1 && (
          <span className="bg-foreground/50 block size-1 shrink-0 self-center" />
        )}
      </React.Fragment>
    ))}
  </span>
);

export type ModalContentProps = {
  projectId: string;
  name: string;
  year: string;
  onClose: () => void;
};
