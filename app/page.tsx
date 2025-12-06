import Hero from './components/sections/Hero';
import WhyUs from './components/sections/WhyUs';
import ModernizeText from './components/sections/ModernizeText';
import CTA from './components/sections/CTA';
import Services from './components/sections/Services';

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Hero />
        <WhyUs />
        <ModernizeText />
        <Services />
        <CTA />
        {/* <ServicesSection /> */}
      </main>
    </>
  );
}
