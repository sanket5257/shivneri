'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

const WhyUptic = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Add hover effect for each card
    cardsRef.current.forEach((card) => {
      if (!card) return;

      card.addEventListener('mouseenter', () => {
        gsap.to(cardsRef.current, {
          opacity: 0.4,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(card, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(cardsRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-24 py-12 sm:py-16 lg:py-24">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="why-badge inline-block px-4 sm:px-6 py-1.5 sm:py-2 border border-neutral-700 rounded-full text-xs sm:text-sm text-neutral-400 mb-6 sm:mb-8">
            Why Shivneri?
          </div>
          <h1 className="why-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-3 sm:mb-4">
            <span className="inline-block"><span className="text-neutral-500">Because </span>Getting it</span>
          </h1>
          <h1 className="why-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight">
            <span className="inline-block">Built isn't Enough.</span>
          </h1>
          <div className="explore-link flex justify-end mt-6 sm:mt-8">
            <Link href="/how-we-work" className="explore-link group inline-flex items-center justify-center space-x-2 px-6 py-2.5 sm:px-8 sm:py-3 border border-neutral-700 rounded-lg hover:border-neutral-500 transition-all duration-300 text-sm sm:text-base">
              <span className="relative z-10">Explore how we work</span>
              <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Full-Stack Engineering Card */}
          <div 
            ref={el => addToRefs(el, 0)}
            className="group relative bg-gradient-to-b from-neutral-900/50 to-black border border-neutral-800/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden hover:border-neutral-700/50 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight">
                Full-Stack + Full-Time Engineering
              </h2>
              <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                  <path d="M3 13l10-10M13 3v10M13 3H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <p className="text-gray-400 mb-12 max-w-lg leading-relaxed text-sm sm:text-base">
              No Contractors. No bloated teams. Just high quality deeply invested engineers who own who own full-stack end-to-end delivery.
            </p>

            {/* Video Background */}
            <div className="relative h-80 rounded-xl overflow-hidden">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                src="/assets/uptic-cube.mp4"
              />
            </div>
          </div>

          {/* Flexible Teams Card */}
          <div 
            ref={el => addToRefs(el, 1)}
            className="group relative bg-gradient-to-b from-neutral-900/50 to-black border border-neutral-800/50 rounded-3xl p-8 overflow-hidden hover:border-neutral-700/50 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight">
                Flexible, fractional product teams
              </h2>
              <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                  <path d="M3 13l10-10M13 3v10M13 3H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <p className="text-gray-400 mb-12 max-w-lg leading-relaxed text-sm sm:text-base">
              Need an expert, a specialist or a full-stack team? We plug in fast, ramp up instantly, and scale to deliver with precision and deep technical ownership.
            </p>

            {/* Video Background */}
            <div className="relative h-80 rounded-xl overflow-hidden">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                src="/assets/uptic-rail.mp4"
              />
            </div>
          </div>

          {/* Bottom Full-Width Card */}
          <div 
            ref={el => addToRefs(el, 2)}
            className="group relative lg:col-span-2 bg-gradient-to-b from-neutral-900/50 to-black border border-neutral-800/50 rounded-3xl overflow-hidden hover:border-neutral-700/50 transition-all duration-500"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Video Background */}
              <div className="relative h-96 lg:h-full overflow-hidden">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                  src="/assets/uptic-sliders.mp4"
                />
              </div>

              {/* Right: Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight">
                    We Build It. We Run It. We Innovate It.
                  </h2>
                  <div className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-400">
                      <path d="M3 13l10-10M13 3v10M13 3H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
                  Uptic delivers full-lifecycle engineering — from secure platform foundations to scalable applications and continuous innovation. No handoffs. No context lost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUptic;