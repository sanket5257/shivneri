'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

const WhyUs = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Hover-driven scale/blur is a pointer interaction — skip it entirely on
    // touch / mobile devices so cards stay flat and don't get stuck mid-effect.
    const hoverCapable =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hoverCapable) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const video = card.querySelector('video');

      const enter = () => {
        cards.forEach((c) => {
          const active = c === card;
          gsap.to(c, {
            opacity: active ? 1 : 0.35,
            scale: active ? 1.025 : 0.97,
            y: active ? -10 : 0,
            filter: active ? 'blur(0px)' : 'blur(2px)',
            borderColor: active
              ? 'rgba(255,255,255,0.16)'
              : 'rgba(38,38,38,0.5)',
            duration: 0.7,
            ease: 'power3.out',
          });
        });
        if (video) gsap.to(video, { scale: 1.08, duration: 1, ease: 'power3.out' });
      };

      const leave = () => {
        cards.forEach((c) => {
          gsap.to(c, {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            borderColor: 'rgba(38,38,38,0.5)',
            duration: 0.7,
            ease: 'power3.out',
          });
        });
        if (video) gsap.to(video, { scale: 1, duration: 1, ease: 'power3.out' });
      };

      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section className="min-h-screen bg-black text-white py-12 sm:py-16 lg:py-24">
      <div className="w-full max-w-[1728px] mx-auto px-6 md:px-12 lg:px-24">
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
            className="group relative cursor-pointer will-change-transform bg-gradient-to-b from-neutral-900/50 to-black border border-neutral-800/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden"
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
              No Contractors. No bloated teams. Just high quality deeply invested engineers who own full-stack end-to-end delivery.
            </p>

            {/* Video Background */}
            <div className="relative h-80 rounded-xl overflow-hidden">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                src="/assets/cube.mp4"
              />
            </div>
          </div>

          {/* Flexible Teams Card */}
          <div
            ref={el => addToRefs(el, 1)}
            className="group relative cursor-pointer will-change-transform bg-gradient-to-b from-neutral-900/50 to-black border border-neutral-800/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden"
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
                src="/assets/rail.mp4"
              />
            </div>
          </div>

          {/* Bottom Full-Width Card */}
          <div
            ref={el => addToRefs(el, 2)}
            className="group relative cursor-pointer will-change-transform lg:col-span-2 bg-gradient-to-b from-neutral-900/50 to-black border border-neutral-800/50 rounded-3xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Video Background — sits below the text on mobile */}
              <div className="relative h-96 lg:h-full overflow-hidden order-2 lg:order-1">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                  src="/assets/sliders.mp4"
                />
              </div>

              {/* Right: Content — sits above the video on mobile */}
              <div className="p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
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
                  Shivneri delivers full-lifecycle engineering — from secure platform foundations to scalable applications and continuous innovation. No handoffs. No context lost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;