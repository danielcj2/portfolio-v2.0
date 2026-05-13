"use client";

import { BracketsSquareIcon, EyeIcon } from "@phosphor-icons/react";
import TVWrapper from "./tv/TVWrapper";
import TextFade from "@/animations/TextFade";

const Contact = () => {
  return (
    <section id="contact" className="h-min w-full">
      <div className="bg-background-v2 relative z-1 h-2 w-full" aria-hidden />
      {/* <div className="mx flex h-[50vh] items-center justify-center pt-12">
        <p className="text-muted-v2 max-w-[35ch] text-center text-4xl leading-snug font-medium tracking-tighter text-pretty">
          Have something
          <BracketsSquareIcon className="mr-px inline" size={42} />{" "}
          <TextFade>interesting</TextFade> in mind — a project, idea, or{" "}
          <TextFade>opportunity</TextFade> — and want to see{" "}
          <EyeIcon className="inline" size={42} /> where it could go?
        </p>
      </div> */}
      <TVWrapper />
    </section>
  );
};

export default Contact;
