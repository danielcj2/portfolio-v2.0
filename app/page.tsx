import Introduction from "@/features/intro/Introduction";
import Contact from "@/features/contact/Contact";
import Hero from "@/features/hero/Hero";
import Work from "@/features/work/Work";
import About from "@/features/about/About";

import Footer from "@/navigation/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <Work />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
