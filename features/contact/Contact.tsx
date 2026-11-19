"use client";

import Logo from "@/images/asterisk.svg";

import { CONTACT_HEIGHT } from "@/lib/layoutHeights";

import React from "react";
import RowFade from "@/animations/RowFade";
import Marquee from "@/animations/Marquee";

const items = [
  "Start a Conversation",
  "Hola, Let's Talk Ideas",
  "Connect with Me",
  "Bonjour, say it back!",
  "I'd love to hear from you",
  "Reach Out Anytime",
];

const Contact = () => {
  const createMarquee = (items: string[]) =>
    [...items, ...items].map((item, index) => (
      <React.Fragment key={`${item}-${index}`}>
        <span>{item}</span>
        <Logo className="text-background [&_path]:fill-background/95 [&_path]:stroke-muted inline h-13.5 w-13.5 lg:h-15 lg:w-15" />
      </React.Fragment>
    ));

  return (
    <section
      id="contact"
      className="relative"
      style={{ height: CONTACT_HEIGHT }}
    >
      <RowFade className="top-[-30vh] h-[60vh]" color={"[#c4c4c4]"} />
      <div className="absolute inset-x-0 top-[30vh] bottom-0 bg-[#c4c4c4]" />
      <div className="sticky top-0 flex h-screen w-full items-center">
        <Marquee
          className="text-background font-sans text-[64px] font-medium tracking-[0.015em] lg:text-[72px]"
          options={{
            baseVelocity: 80,
            scrollBoost: false,
            gap: 24,
          }}
        >
          {createMarquee(items)}
        </Marquee>
      </div>
    </section>
  );
};

export default Contact;
