"use client";

import Image from "next/image";
import Carousel from "@/ui/Carousel";
import Card from "@/ui/Card";
import { useMemo } from "react";
import { useImagePreloader } from "@/lib/useImagePreloader";
import {
  Highlight,
  List,
  ListItem,
  ModalHeader,
  Paragraph,
  Subheading,
  Wrapper,
  type ModalContentProps,
} from "./shared";

const carouselBg =
  "bg-linear-[150deg,#186ebd,#1d6bb8,#2e5596,#272b4a,#1c1c24,transparent_70%]";

const r2Url = process.env.NEXT_PUBLIC_BLUEWAVE;
const IMAGES = [
  { src: `${r2Url}/mockup.png`, alt: "Bluewave Uptime screenshot 1" },
  { src: `${r2Url}/mockup2.png`, alt: "Bluewave Uptime screenshot 2" },
  { src: `${r2Url}/mockup3.png`, alt: "Bluewave Uptime screenshot 3" },
  { src: `${r2Url}/mockup4.png`, alt: "Bluewave Uptime screenshot 4" },
];

const outline = (
  <div className="bg-foreground/10 absolute -inset-2 -z-1 hidden w-auto rounded-3xl xl:block" />
);

type ImageProps = React.ComponentProps<typeof Image>;

/* eslint-disable jsx-a11y/alt-text */
const getSlides = (images: ImageProps[]) => [
  <Wrapper key={images[0].alt}>
    <div className="absolute h-auto w-[55%]">
      <Image
        className="h-auto w-full object-cover select-none"
        {...images[0]}
      />
      {outline}
    </div>
  </Wrapper>,
  <Wrapper key={images[1].alt}>
    <div className="absolute h-[75%] w-auto">
      <Image
        className="h-full w-auto object-cover select-none"
        {...images[1]}
      />
      {outline}
    </div>
  </Wrapper>,
  <Wrapper key={images[2].alt}>
    <div className="absolute h-auto w-[70%]">
      <Image
        className="h-auto w-full object-cover select-none"
        {...images[2]}
      />
      {outline}
    </div>
  </Wrapper>,
  <Wrapper key={images[3].alt}>
    <div className="absolute h-auto w-[65%]">
      <Image
        className="h-auto w-full object-cover select-none"
        {...images[3]}
      />
      {outline}
    </div>
  </Wrapper>,
];
/* eslint-enable jsx-a11y/alt-text */

const BluewaveModal = ({
  projectId,
  name,
  year,
  onClose,
}: ModalContentProps) => {
  const { isReady: imagesReady, dimensions } = useImagePreloader(
    IMAGES.map((img) => img.src),
    1500,
  );

  const slides = useMemo(() => {
    if (!imagesReady) return [];

    return getSlides(
      IMAGES.map((img, i) => ({
        ...img,
        width: dimensions[i]?.width ?? 800,
        height: dimensions[i]?.height ?? 600,
      })),
    );
  }, [imagesReady, dimensions]);

  return (
    <>
      <Card
        className="h-80 lg:h-150 xl:h-full xl:min-h-104 xl:flex-1"
        layoutId={`card-${projectId}`}
        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
        theme="light"
      >
        <Carousel items={slides} bg={carouselBg} isLoading={!imagesReady} />
      </Card>
      <Card
        className="h-full min-h-50 w-full rounded-[20px] bg-neutral-900/70 xl:w-125"
        theme="stacked"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <ModalHeader name={name} year={year} onClose={onClose} />
        <Card
          className="flex h-full flex-col gap-6 overflow-auto rounded-xl p-5 pb-12"
          theme="light"
        >
          <Paragraph>
            An organization building <Highlight>web-based tools</Highlight>{" "}
            across multiple teams and projects. I worked on{" "}
            <Highlight>BlueWave Uptime</Highlight>, a monitoring platform that
            tracks website and API uptime, performance, and reliability through{" "}
            <Highlight>customizable monitors</Highlight>, real-time alerts, and
            analytics.
          </Paragraph>
          <div className="flex flex-col gap-2">
            <Subheading>What I worked on</Subheading>
            <List>
              <ListItem>
                Standardized the <Highlight>user interface</Highlight> using
                Material UI, while refactoring parts of the codebase, removing
                redundancy and dead code.
              </ListItem>
              <ListItem>
                Suggested and implemented{" "}
                <Highlight>small design improvements</Highlight> across the
                interface (spacing, layout, and component behavior).
              </ListItem>
              <ListItem>
                Collaborated with <Highlight>backend developers</Highlight> to
                align on API structure and ensure reliable data flow.
              </ListItem>
              <ListItem>
                Reviewed <Highlight>pull requests</Highlight> to maintain code
                quality and enforce consistent patterns across the codebase.
              </ListItem>
            </List>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default BluewaveModal;
