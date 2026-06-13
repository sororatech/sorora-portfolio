import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Contact from "@/components/sections/Contact";
import Services from "@/components/sections/Services";




export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Services/>
      <Contact/>
      <Footer />
    </>
  );
}