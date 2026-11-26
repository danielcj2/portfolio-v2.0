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
  TechStack,
  Wrapper,
  type ModalContentProps,
} from "./shared";

const carouselBg =
  "bg-linear-[180deg,#ab7a18,#a97528,#925554,#3f2c46,#1d1c24,transparent_45%]";

const r2Url = process.env.NEXT_PUBLIC_PORTFOLIO;
const IMAGES = [
  { src: `${r2Url}/ravensview_mockup.png`, alt: "Ravensview screenshot 0" },
  { src: `${r2Url}/ravensview_mockup1.png`, alt: "Ravensview screenshot 1" },
  { src: `${r2Url}/ravensview_mockup2.png`, alt: "Ravensview screenshot 2" },
  { src: `${r2Url}/ravensview_mockup3.png`, alt: "Ravensview screenshot 3" },
  { src: `${r2Url}/ravensview_mockup4.png`, alt: "Ravensview screenshot 4" },
  { src: `${r2Url}/ravensview_mockup5.png`, alt: "Ravensview screenshot 5" },
  { src: `${r2Url}/ravensview_mockup6.png`, alt: "Ravensview screenshot 6" },
];

type ImageProps = React.ComponentProps<typeof Image>;

const tools = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Sanity", "Instagram Graph API", "Mailchimp", "Figma", "Vercel"];

/* eslint-disable jsx-a11y/alt-text */
const getSlides = (images: ImageProps[]) =>
  images.map((img) => (
    <Wrapper key={img.alt}>
      <div className="absolute h-auto w-[65%]">
        <Image className="h-auto w-full object-cover select-none" {...img} />
        <div className="bg-foreground/10 absolute -inset-2 -z-1 hidden w-auto xl:block" />
      </div>
    </Wrapper>
  ));
/* eslint-enable jsx-a11y/alt-text */

const RavensviewModal = ({
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
            A <Highlight>website redesign</Highlight> for a family-owned local
            farm, commissioned to replace their existing website with a more
            modern and engaging online presence.
          </Paragraph>
          <Paragraph>
            I handled the entire project, from initial design and layout through
            to <Highlight>frontend development</Highlight>, CMS integration, and deployment.
          </Paragraph>
          <div className="flex flex-col gap-2">
            <Subheading>What I worked on</Subheading>
            <List>
              <ListItem>
                Built the frontend with Next.js, React, and{" "}
                <Highlight>TypeScript</Highlight>, using Tailwind CSS for
                styling and Motion for animations and interactive elements.
              </ListItem>
              <ListItem>
                Set up Sanity as the <Highlight>CMS</Highlight> behind the
                recipe section, giving the client a straightforward way to add,
                edit, and manage recipes themselves.
              </ListItem>
              <ListItem>
                Brought Instagram content and <Highlight>Mailchimp</Highlight>{" "}
                newsletter signup into the website.
              </ListItem>
              <ListItem>
                Worked through the layouts and interactions across mobile and
                desktop.
              </ListItem>
            </List>
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

export default RavensviewModal;
