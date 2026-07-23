import SplashScreen from '@/components/sections/Splash';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About'; // adjust path as needed
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      {/* Splash screen sits above everything else */}
      <SplashScreen />
      
      {/* The rest of your site */}
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
    </>
  );
}