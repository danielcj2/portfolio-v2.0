import Introduction from "@/features/intro/Introduction";
import Contact from "@/features/contact/Contact";
import Hero from "@/features/hero/Hero";
import Work from "@/features/work/Work";
import About from "@/features/about/About";

import Footer from "@/navigation/Footer";
import MobileBlur from "@/components/ui/MobileBlur";

export default function Home() {
  return (
    <>
      <MobileBlur />
      <Hero />
      <Introduction />
      <Work />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
