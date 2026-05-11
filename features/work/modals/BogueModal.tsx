"use client";

import Image from "next/image";
import Carousel from "@/ui/Carousel";
import Card from "@/ui/Card";
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
  "bg-linear-[180deg,#ab7a18,#a97528,#925554,#3f2c46,#1d1c24,transparent_45%]";

const r2Url = process.env.NEXT_PUBLIC_BOGUE;

const slides = ["", 2, 3, 4].map((src, index) => (
  <Wrapper key={`bogue-${index}`}>
    <div className="absolute h-auto w-[65%]">
      <Image
        className="h-auto w-full object-cover select-none"
        src={`${r2Url}/mockup${src}.png`}
        width={1180}
        height={905}
        alt={`Bogue screenshot ${index + 1}`}
      />
      <div className="bg-foreground/10 absolute -inset-2 -z-1 hidden w-auto md:block" />
    </div>
  </Wrapper>
));

const BogueModal = ({ projectId, name, year, onClose }: ModalContentProps) => (
  <>
    <Card
      className="h-80 md:h-full md:min-h-104 md:flex-1"
      layoutId={`card-${projectId}`}
      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      theme="light"
    >
      <div className={`absolute inset-0 -z-1 ${carouselBg}`} />
      <Carousel items={slides} />
    </Card>
    <Card
      className="h-full min-h-50 w-full rounded-[20px] bg-neutral-900/70 md:w-125"
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
          A <Highlight>personal e-commerce project</Highlight> built from
          scratch, covering the core pieces of a modern online store. It
          includes{" "}
          <Highlight>
            product browsing, cart functionality, and a checkout flow
          </Highlight>
          . The project also served as a space to explore and apply new tools in
          a real-world style build.
        </Paragraph>
        <div className="flex flex-col gap-2">
          <Subheading>What I worked on</Subheading>
          <List>
            <ListItem>
              Implemented <Highlight>product browsing</Highlight>, cart
              functionality, and a checkout flow.
            </ListItem>
            <ListItem>
              Designed and built the <Highlight>full user interface</Highlight>{" "}
              for a smooth end-to-end shopping experience.
            </ListItem>
            <ListItem>
              Used <Highlight>Supabase</Highlight> for authentication, database
              management, and backend services.
            </ListItem>
          </List>
        </div>
      </Card>
    </Card>
  </>
);

export default BogueModal;
