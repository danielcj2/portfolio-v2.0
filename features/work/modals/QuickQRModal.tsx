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

/* eslint-disable jsx-a11y/alt-text */
const getSlides = (images: ImageProps[]) => [
  <Wrapper key={images[0].alt}>
    <div className="absolute h-auto w-[75%]">
      <Image
        className="h-auto w-full object-cover select-none"
        {...images[0]}
      />
      <div className="bg-foreground/10 absolute -inset-3 -z-1 hidden w-auto rounded-[clamp(0.75rem,2.3vw,3rem)] rounded-tl-[clamp(0.5rem,1.5vw,1.5rem)] xl:block" />
    </div>
  </Wrapper>,
  <Wrapper key={images[1].alt}>
    <div className="absolute bottom-10 h-auto w-[70%] lg:w-[50%] xl:bottom-25 xl:h-[130%] xl:w-auto">
      <Image
        className="h-full w-auto object-cover select-none"
        {...images[1]}
      />
      <div className="bg-foreground/10 absolute -inset-3 -z-1 hidden rounded-b-[clamp(0.75rem,2.3vw,3rem)] xl:block" />
    </div>
  </Wrapper>,
  <Wrapper key={images[2].alt}>
    <div className="absolute h-auto w-[75%]">
      <Image
        className="h-auto w-full object-cover select-none"
        {...images[2]}
      />
      <div className="bg-foreground/10 absolute -inset-3 -z-1 hidden w-auto rounded-[clamp(0.25rem,2vw,2.5rem)] rounded-tl-[clamp(0.5rem,1.5vw,1.5rem)] xl:block" />
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
      <div className="from-foreground/20 via-foreground/5 absolute -inset-2 -z-1 hidden w-auto rounded-tl-3xl rounded-tr-[38px] rounded-b-[38px] bg-linear-to-r from-0% via-50% to-[#cac9cd]/3 to-100% xl:-inset-3 xl:block" />
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
          className="flex h-full flex-col gap-6 overflow-auto rounded-xl p-5 pb-12"
          theme="light"
        >
          <Paragraph>
            A QR code platform that brings{" "}
            <Highlight>eight microservices</Highlight> into one single system,
            helping businesses <Highlight>create, manage, and track</Highlight>{" "}
            QR-based interactions. It supports use cases like marketing, product
            info, and contactless experiences, with{" "}
            <Highlight>built-in analytics</Highlight> to understand how people
            engage.
          </Paragraph>
          <div className="flex flex-col gap-2">
            <Subheading>What I worked on</Subheading>
            <List>
              <ListItem>
                Took ownership of the <Highlight>frontend</Highlight>, working
                closely with the CTO to shape how the product is built and
                maintained.
              </ListItem>
              <ListItem>
                Led the <Highlight>UI/UX design</Highlight> across the
                application, defining how users navigate and interact with the
                product.
              </ListItem>
              <ListItem>
                Set up the frontend architecture and selected libraries for
                state management, forms, and routing.
              </ListItem>
              <ListItem>
                Designed{" "}
                <Highlight>wireframes and high-fidelity mockups</Highlight> to
                define clear, usable workflows.
              </ListItem>
              <ListItem>
                Implemented API routes for client-side data fetching and
                server-side rendering for direct microservice integration.
              </ListItem>
            </List>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default QuickQRModal;
