"use client";

import Image from "next/image";
import Carousel from "@/ui/Carousel";
import Card from "@/ui/Card";
import { useMemo } from "react";
import { useImagePreloader } from "@/lib/useImagePreloader";
import {
  Highlight,
  ListItem,
  ModalHeader,
  Paragraph,
  Subheading,
  TechStack,
  Wrapper,
  type ModalContentProps,
} from "./shared";

const carouselBg =
  "bg-linear-[90deg,#ab1831,#a61a30,#83202a,#3b1d1d,#1b1717,transparent_60%]";

const r2Url = process.env.NEXT_PUBLIC_QUICKQR;
const IMAGES = [
  { src: `${r2Url}/mockup.png`, alt: "quickQR screenshot 1" },
  { src: `${r2Url}/mockup2.png`, alt: "quickQR screenshot 2" },
  { src: `${r2Url}/mockup3.png`, alt: "quickQR screenshot 3" },
  { src: `${r2Url}/mockup4.png`, alt: "quickQR screenshot 4" },
  { src: `${r2Url}/mockup4-dark.png`, alt: "quickQR screenshot 4 dark" },
];

type ImageProps = React.ComponentProps<typeof Image>;

const tools = ["Next.js", "React.js", "JavaScript", "Sass", "Sentry", "Zustand", "RHF", "Zod", "Figma", "Git", "REST API"];

/* eslint-disable jsx-a11y/alt-text */
const getSlides = (images: ImageProps[]) => [
  <Wrapper key={images[0].alt}>
    <div className="absolute h-auto w-[75%]">
      <Image
        className="h-auto w-full object-cover select-none"
        {...images[0]}
      />
      <div className="bg-foreground/10 absolute -inset-2 -z-1 hidden w-auto rounded-[clamp(0.75rem,2.3vw,3rem)] rounded-tl-[clamp(0.5rem,1.5vw,1.5rem)] xl:block" />
    </div>
  </Wrapper>,
  <Wrapper key={images[1].alt}>
    <div className="absolute bottom-10 h-auto w-[70%] lg:w-[50%] xl:bottom-25 xl:h-[130%] xl:w-auto">
      <Image
        className="h-full w-auto object-cover select-none"
        {...images[1]}
      />
      <div className="bg-foreground/10 absolute -inset-2 -z-1 hidden rounded-b-[clamp(0.75rem,2.5vw,3rem)] xl:block" />
    </div>
  </Wrapper>,
  <Wrapper key={images[2].alt}>
    <div className="absolute h-auto w-[75%]">
      <Image
        className="h-auto w-full object-cover select-none"
        {...images[2]}
      />
      <div className="bg-foreground/10 absolute -inset-2 -z-1 hidden w-auto rounded-[clamp(0.25rem,2vw,2.25rem)] rounded-tl-[clamp(0.5rem,1.5vw,1.25rem)] xl:block" />
    </div>
  </Wrapper>,
  <Wrapper key={images[3].alt}>
    <div className="relative flex h-auto w-[80%] gap-3">
      <div className="h-auto flex-1">
        <Image
          className="h-auto w-full object-cover select-none"
          {...images[3]}
        />
      </div>
      <div className="h-auto flex-1">
        <Image
          className="h-auto w-full object-cover select-none"
          {...images[4]}
        />
      </div>
      <div className="from-foreground/20 via-foreground/5 absolute -inset-2 -z-1 hidden w-auto rounded-tl-[22px] rounded-tr-4xl rounded-b-4xl bg-linear-to-r from-0% via-75% to-[#cac9cd]/1 to-100% xl:block" />
    </div>
  </Wrapper>,
];
/* eslint-enable jsx-a11y/alt-text */

const QuickQRModal = ({
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
          className="flex h-full flex-col gap-6 overflow-auto rounded-xl p-4 md:p-5 pb-12"
          data-lenis-prevent
          theme="light"
        >
          <Paragraph>
            A QR code platform connecting{" "}
            <Highlight>eight microservices</Highlight> into a single
            application, allowing businesses to create, manage, and track
            QR-based interactions. The platform supports marketing, product
            information, and contactless experiences, with built-in analytics to
            track engagement.
          </Paragraph>
          <Paragraph>
            I led the frontend development and <Highlight>UI/UX</Highlight>,
            working directly with the CTO on the application's architecture,
            technical direction, and overall experience.
          </Paragraph>
          <div className="flex flex-col gap-2">
            <Subheading>What I worked on</Subheading>
            <ul>
              <ListItem>
                Established the <Highlight>Next.js application</Highlight>{" "}
                architecture and built the API layer connecting the frontend to
                eight backend microservices.
              </ListItem>
              <ListItem>
                Developed shared React components across the platform, covering
                everything from common <Highlight>interface elements</Highlight>{" "}
                to more involved forms and application features.
              </ListItem>
              <ListItem>
                Was involved from the early stages of the product, taking
                initial concepts through <Highlight>wireframes</Highlight> and
                high-fidelity designs before bringing them into the application.
              </ListItem>
              <ListItem>
                Worked closely with the CTO throughout development, contributing
                to <Highlight>product decisions</Highlight>, technical
                discussions, and how new features were approached and
                implemented.
              </ListItem>
            </ul>
          </div>
          <div className="flex flex-col gap-1.5">
            <Subheading>Tech Stack</Subheading>
            <TechStack tools={tools} />
          </div>
        </Card>
      </Card>
    </>
  );
};

export default QuickQRModal;
