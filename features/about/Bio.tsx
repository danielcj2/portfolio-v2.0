import Blur from "@/ui/Blur";
import Tools from "./parts/Tools";
import TextFade from "@/animations/TextFade";
import Accordion, { AccordionItem } from "@/ui/Accordion";
import { education, experience, services, techstack } from "@/lib/bio";

// TODO: Refactor into Accordion
export const ShortBio = () => (
  <div className="mx relative h-min overflow-clip lg:h-240">
    <div className="grid-12 relative pt-24 lg:pt-64">
      <div className="text-muted-v2 relative top-12 col-start-1 col-end-13 flex flex-col gap-2 text-[28px] leading-tight font-medium text-pretty text-center lg:text-left lg:sticky lg:col-start-5 lg:gap-4 lg:px-4 md:text-[36px] lg:text-[32px] lg:text-balance">
        <p>
          Frontend Developer based in <TextFade>Toronto</TextFade>, Canada.
        </p>
        <p>
          My background spans <TextFade>three different countries</TextFade>,
          filled with experiences that have shaped how I perceive and approach
          building things.
        </p>
        <p>
          Being exposed to different <TextFade>cultures</TextFade> and
          perspectives made me naturally curious — and a bit of a{" "}
          <TextFade>thrill-seeker</TextFade>.
        </p>
        <p>I build stuff for the web.</p>
      </div>
      <div className="pointer-events-none col-span-full h-48 lg:h-180" />
    </div>
    <div className="grid-12 pointer-events-none absolute inset-0">
      <Blur className="col-start-5 col-end-13 hidden self-end md:block" />
    </div>
  </div>
);

export const Experience = () => (
  <Accordion
    title="Where I've been"
    caption="+3 years of experience"
    length={experience.length}
  >
    {experience.map((row, index) => (
      <AccordionItem key={`experience-${index}`} row={row} />
    ))}
  </Accordion>
);

export const Education = () => (
  <Accordion title="Where I studied" length={education.length}>
    {education.map((row, index) => (
      <AccordionItem key={`education-${index}`} row={row} />
    ))}
  </Accordion>
);

export const Services = () => (
  <Accordion title="What I do" length={services.length}>
    {services.map((row, index) => (
      <AccordionItem key={`service-${index}`} row={row} />
    ))}
  </Accordion>
);

export const Techstack = () => (
  <Accordion title="Tools I use" length={0} offset="bottom">
    <AccordionItem
      row={techstack.map((type) => ({
        type: "block",
        content: <Tools type={type} />,
      }))}
    />
  </Accordion>
);
