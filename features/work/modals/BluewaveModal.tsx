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
  "bg-linear-[150deg,#186ebd,#1d6bb8,#2e5596,#272b4a,#1c1c24,transparent_70%]";

const r2Url = process.env.NEXT_PUBLIC_BLUEWAVE;
const outline =
  "bg-foreground/10 absolute -inset-2 -z-1 w-auto rounded-3xl hidden xl:block";

const slides = [
  <Wrapper key="monitors">
    <div className="absolute h-auto w-[55%]">
      <Image
        className="h-auto w-full object-cover select-none"
        src={`${r2Url}/mockup.png`}
        width={836}
        height={605}
        alt="Bluewave Uptime screenshot 1"
      />
      <div className={outline} />
    </div>
  </Wrapper>,
  <Wrapper key="integrations">
    <div className="absolute h-[75%] w-auto">
      <Image
        className="h-full w-auto object-cover select-none"
        src={`${r2Url}/mockup2.png`}
        width={460}
        height={650}
        alt="Bluewave Uptime screenshot 2"
      />
      <div className={outline} />
    </div>
  </Wrapper>,
  <Wrapper key="monitors-create">
    <div className="absolute h-auto w-[70%]">
      <Image
        className="h-auto w-full object-cover select-none"
        src={`${r2Url}/mockup3.png`}
        width={931}
        height={563}
        alt="Bluewave Uptime screenshot 3"
      />
      <div className={outline} />
    </div>
  </Wrapper>,
  <Wrapper key="maintenance">
    <div className="absolute h-auto w-[65%]">
      <Image
        className="h-auto w-full object-cover select-none"
        src={`${r2Url}/mockup4.png`}
        width={931}
        height={563}
        alt="Bluewave Uptime screenshot 4"
      />
      <div className={outline} />
    </div>
  </Wrapper>,
];

const BluewaveModal = ({
  projectId,
  name,
  year,
  onClose,
}: ModalContentProps) => (
  <>
    <Card
      className="h-80 lg:h-150 xl:h-full xl:min-h-104 xl:flex-1"
      layoutId={`card-${projectId}`}
      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      theme="light"
    >
      <div className={`absolute inset-0 -z-1 ${carouselBg}`} />
      <Carousel items={slides} />
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
          An organization building <Highlight>web-based tools</Highlight> across
          multiple teams and projects. I worked on{" "}
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

export default BluewaveModal;
