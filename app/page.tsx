import Introduction from "@/features/intro/Introduction";
import Contact from "@/features/contact/Contact";
import Hero from "@/features/hero/Hero";
import Work from "@/features/work/Work";
import About from "@/features/about/About";
import TVStage from "@/components/tv/TVStage";

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <Work />
      <About />
      <Contact />
      <TVStage />
    </>
  );
}
