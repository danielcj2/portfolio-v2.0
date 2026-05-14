"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import TextFlip from "../animations/TextFlip";
import TextGrow from "../animations/TextGrow";
import Blur from "./Blur";
import { useMediaQuery } from "@/providers/MediaQueryContext";

type AccordionProps = {
  title: string;
  caption?: string;
  length?: number;
  offset?: "top" | "bottom";
  children: React.ReactNode;
};
type AccordionItemCol = {
  content?: React.ReactNode;
  type: "text" | "heading" | "number" | "block";
  fill?: boolean;
};
type AccordionItemProps = { row?: AccordionItemCol[] };
type AccordionCellProps = { children?: React.ReactNode };

const AccordionNumber = ({ children }: { children?: React.ReactNode }) => {
  if (typeof children !== "string") return null;

  return (
    <div className="max-w-1/2 md:max-w-40">
      <TextGrow
        text={children}
        className="font-chakra text-end text-[0.8125rem] font-bold tracking-wider text-nowrap"
      />
    </div>
  );
};

const AccordionText = ({ children }: { children?: React.ReactNode }) => (
  <div className="mb-12 py-3 md:mb-0 md:min-h-20 md:p-4">
    <p className="max-w-[50ch] text-[0.8125rem]">{children}</p>
  </div>
);

const AccordionHeading = ({ children }: { children?: React.ReactNode }) => (
  <div className="py-3 md:min-h-20 md:p-4">
    <p className="text-sm font-semibold">{children}</p>
  </div>
);

const AccordionBlock = ({ children }: AccordionCellProps) => (
  <div className="px-2 pt-2 lg:p-1.5 2xl:p-3">{children}</div>
);

const CELL_RENDERERS: Record<
  AccordionItemCol["type"],
  React.ComponentType<AccordionCellProps>
> = {
  number: AccordionNumber,
  text: AccordionText,
  heading: AccordionHeading,
  block: AccordionBlock,
};

export const AccordionItem = ({ row }: AccordionItemProps) => {
  const { isMobile, isLg } = useMediaQuery();

  if (isMobile || !isLg) {
    const first = row?.[0];
    const rest = row?.slice(1) ?? [];
    const restAreBlocks = rest.every((col) => col.type === "block");

    return (
      <>
        {first &&
          (() => {
            const Cell = CELL_RENDERERS[first.type];
            return (
              <div key={`${first.type}-0`}>
                <Cell>{first.content}</Cell>
              </div>
            );
          })()}
        {rest.length > 0 && (
          <div className={`flex ${restAreBlocks ? "flex-col pb-24" : ""}`}>
            {rest.map((col, index) => {
              const Cell = CELL_RENDERERS[col.type];
              return (
                <div key={`${col.type}-${index + 1}`} className="flex-1">
                  <Cell>{col.content}</Cell>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {row?.map((col, index) => {
        const COL_START = 5;
        const COL_END = 13;
        const COL_SPAN = 2;

        const colStart = COL_START + index * COL_SPAN;
        const colEnd = col.fill ? COL_END : colStart + COL_SPAN;
        const { content } = col;
        const Cell = CELL_RENDERERS[col.type];

        return (
          <div
            key={`${col.type}-${index}`}
            style={{
              gridColumnStart: colStart,
              gridColumnEnd: colEnd,
            }}
          >
            <Cell>{content}</Cell>
          </div>
        );
      })}
    </>
  );
};

const DesktopView = ({
  title,
  caption,
  length = 1,
  offset = "top",
  children,
}: AccordionProps) => {
  const max = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const spacer = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (offset === "bottom") {
        const gridHeight = grid.current?.offsetHeight ?? 0;
        setSpacerHeight(gridHeight);
        return;
      }

      if (max.current && wrapper.current && spacer.current) {
        const maxHeight = max.current.offsetHeight;
        const wrapperHeight = wrapper.current.offsetHeight;
        const calculatedHeight = maxHeight - wrapperHeight;
        setSpacerHeight(Math.max(0, calculatedHeight));
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [offset]);

  return (
    <div className="mx relative h-280 overflow-clip xl:h-220" ref={max}>
      <div className="relative">
        <motion.div
          ref={grid}
          className="grid-12 sticky top-0 overflow-clip"
          style={{
            gridTemplateRows: `repeat(${length + 1}, minmax(0, 1fr))`,
          }}
        >
          <div
            className="col-start-5 col-end-7 flex h-full items-end px-2"
            ref={wrapper}
          >
            <div className="text-muted-v2 font-chakra relative my-4 w-min cursor-default text-sm font-semibold tracking-wider uppercase">
              <TextFlip>{title}</TextFlip>
            </div>
          </div>
          {caption && (
            <div className="col-start-7 col-end-13 self-end px-3">
              <div className="text-muted-v2 font-chakra mb-4 h-full cursor-default text-sm font-semibold tracking-wider uppercase">
                <TextFlip>{caption}</TextFlip>
              </div>
            </div>
          )}
          {children}
          <div
            className="pointer-events-none absolute inset-0 -z-1 col-start-5 col-end-13 flex flex-col justify-between"
            style={{
              gridRowStart: 1,
              gridRowEnd: length + 1,
            }}
          >
            {Array.from({ length: length + 1 }).map((_, i) => (
              <div
                key={i}
                className="h-1 w-full bg-[rgba(255,255,255,0.02)]"
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.div>
        <div
          ref={spacer}
          className="pointer-events-none"
          style={{ height: `${spacerHeight}px` }}
        />
      </div>
      {offset !== "bottom" && (
        <div className="grid-12 pointer-events-none absolute inset-0">
          <Blur className="col-start-5 col-end-13 self-end" />
        </div>
      )}
    </div>
  );
};

const MobileView = ({ title, children }: AccordionProps) => {
  return (
    <div className="mx relative flex flex-col">
      <div className="text-muted-v2 font-chakra relative flex w-full cursor-default border-b-4 border-[rgba(255,255,255,0.02)] py-2 text-sm font-semibold tracking-wider uppercase">
        <TextFlip>{title}</TextFlip>
      </div>
      {children}
    </div>
  );
};

const Accordion = ({
  title,
  caption,
  length,
  offset = "top",
  children,
}: AccordionProps) => {
  const { isMobile, isLg } = useMediaQuery();

  if (isMobile || !isLg) {
    return (
      <MobileView title={title} length={length}>
        {children}
      </MobileView>
    );
  }

  return (
    <DesktopView
      title={title}
      caption={caption}
      length={length}
      offset={offset}
    >
      {children}
    </DesktopView>
  );
};

export default Accordion;
