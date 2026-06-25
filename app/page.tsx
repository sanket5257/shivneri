import Hero from './components/sections/Hero';
import AboutApproach from './components/sections/AboutApproach';
import WhyUs from './components/sections/WhyUs';
import ModernizeText from './components/sections/ModernizeText';
import CTA from './components/sections/CTA';
import Services from './components/sections/Services';

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Hero />
        <AboutApproach />
        <WhyUs />
        <ModernizeText />
        <Services />
        <CTA />
        
      </main>
    </>
  );
}
