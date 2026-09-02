import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Elements from "@/components/sections/Elements";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/sections/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Services />
        <Elements />
        <About />
        <Process />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
