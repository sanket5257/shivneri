'use client';

import { useEffect, useRef } from 'react';
import Mvp from '../components/sections/Mvp';
import Manifesto from '../components/sections/Manifesto';
import Careears from '../components/sections/Careears';
import Contact from '../components/sections/Contact';
import Journey from '../components/sections/Journey';

export default function UpticLanding() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import GSAP and ScrollTrigger
    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;
      
      import('gsap/ScrollTrigger').then((ScrollTriggerModule) => {
        const ScrollTrigger = ScrollTriggerModule.default;
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations (exclude button)
        const heroElements = heroRef.current?.querySelectorAll('.hero-content > :not(button)');
        if (heroElements && heroElements.length > 0) {
          gsap.from(heroElements, {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
          });
        }

        // Cylinder rotation animation
        gsap.to(cylinderRef.current, {
          rotationY: 360,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Card 1 animation (right side)
        gsap.from(card1Ref.current, {
          opacity: 0,
          x: 100,
          y: 50,
          scrollTrigger: {
            trigger: card1Ref.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        });

        // Card 2 animation (left side)
        gsap.from(card2Ref.current, {
          opacity: 0,
          x: -100,
          y: 50,
          scrollTrigger: {
            trigger: card2Ref.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1,
          },
        });

        // Card 3 animation (right side)
        gsap.from(card3Ref.current, {
          opacity: 0,
          x: 100,
          y: 50,
          scrollTrigger: {
            trigger: card3Ref.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        });

        // Parallax effect for background grid
        gsap.to('.bg-grid', {
          y: 200,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Section title animation
        gsap.from('.section-title', {
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          },
        });
      });
    });
  }, []);

  const services = [
    {
      question: "Startups with big ideas?",
      answer: "We're your full-stack launchpad.",
      ref: card1Ref,
      position: 'right'
    },
    {
      question: "Enterprises untangling old systems?",
      answer: "We refactor and modernize the mess",
      ref: card2Ref,
      position: 'left'
    },
    {
      question: "MSPs and IT teams?",
      answer: "We help you scale and automate without burnout.",
      ref: card3Ref,
      position: 'right'
    }
  ];

  return (
    <div className="overflow-x-hidden bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Background Grid */}
        <div className="bg-grid absolute top-50  justify-center pointer-events-none">
          <img 
            src="/assets/images/68cc1d20b007e6b094307335_6576752236.svg" 
            alt="Background Grid"
            className="opacity-60"
          />
        </div>

        {/* Content */}
        <div className="hero-content relative z-10 text-center space-y-8">
          <button className="px-6 py-2 rounded-full border border-gray-700 text-gray-400 text-sm hover:border-gray-500 transition-colors">
            About Shivneri Systems
          </button>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-tight">
            Bold Tech.
            <br />
            <span className="text-neutral-500">Built by People.</span>
          </h1>
          
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg px-2 sm:px-0">
            We're a lean, global crew of engineers, architects, and coders building
            bold new apps and transforming legacy systems—with speed, security,
            and a little swagger.
          </p>
          
          <button className="btn-primary">
            Explore our work
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative min-h-screen px-4 sm:px-6 py-20 md:py-32">
        <div className="w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="section-title mb-32">
            <button className="px-6 py-2 rounded-full border border-gray-700 text-gray-400 text-sm hover:border-gray-500 transition-colors mb-8">
              Who We Are
            </button>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              Not Your
              <br />
              Average <span className="text-neutral-500">Dev</span>
              <br />
              <span className="text-neutral-500">& Cloud Shop</span>
            </h2>
            
            <p className="text-neutral-400 max-w-xl text-base sm:text-lg mt-6 sm:mt-8">
              We're the team companies call when they need modern software
              that actually ships. From cloud-native builds to pipelines and
              automation, we architect your future while fixing what's holding
              you back.
            </p>
          </div>

          {/* 3D Cylinder with Cards */}
          <div className="relative flex items-center justify-center min-h-[600px] sm:min-h-[800px]">
            {/* Wireframe Cylinder */}
            <div 
              ref={cylinderRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ perspective: '1000px' }}
            >
              <div className="w-64 h-[700px] opacity-20">
                <svg viewBox="0 0 200 700" className="w-full h-full">
                  <defs>
                    <linearGradient id="cylinderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  {/* Horizontal rings */}
                  {[...Array(14)].map((_, i) => (
                    <ellipse
                      key={`ring-${i}`}
                      cx="100"
                      cy={50 + i * 50}
                      rx="80"
                      ry="20"
                      fill="none"
                      stroke="url(#cylinderGradient)"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Vertical lines */}
                  {[...Array(16)].map((_, i) => {
                    const angle = (i * Math.PI) / 8;
                    const x = 100 + 80 * Math.cos(angle);
                    return (
                      <line
                        key={`line-${i}`}
                        x1={x}
                        y1="50"
                        x2={x}
                        y2="650"
                        stroke="url(#cylinderGradient)"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Service Cards */}
            <div className="relative w-full max-w-6xl h-[600px] sm:h-[800px]">
              {services.map((service, index) => (
                <div
                  key={index}
                  ref={service.ref}
                  className={`absolute ${
                    service.position === 'right' 
                      ? 'right-0 sm:right-10' 
                      : 'left-0 sm:left-10'
                  } ${
                    index === 0 
                      ? 'top-[5%] sm:top-[10%]' 
                      : index === 1 
                      ? 'top-[40%] sm:top-[45%] -translate-y-1/2' 
                      : 'top-[70%] sm:top-[75%]'
                  } w-full sm:w-auto px-4 sm:px-0`}
                >
                  <div className="bg-neutral-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 sm:p-8 w-full max-w-md hover:border-gray-700 transition-all hover:scale-105">
                    <p className="text-white font-medium mb-3 text-lg">{service.question}</p>
                    <p className="text-gray-400">{service.answer}</p>
                  </div>
                  
                  {/* Connection dot */}
                  <div className={`hidden sm:block absolute top-1/2 -translate-y-1/2 ${
                    service.position === 'right' 
                      ? '-left-12 md:-left-16' 
                      : '-right-12 md:-right-16'
                  }`}>
                    <div className="w-12 h-12 rounded-full bg-neutral-800 border-2 border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors">
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
              <Mvp/>
              <Manifesto/>
              <Journey/>
              <Contact/>
              <Careears/>
      {/* Additional spacing */}
    </div>
  );
}