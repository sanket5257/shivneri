'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftContentRef.current || !rightContentRef.current) return;

    // Set initial styles
    gsap.set([leftContentRef.current, rightContentRef.current], {
      y: 50,
      opacity: 0
    });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });

    // Animate elements
    tl.to(leftContentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to(rightContentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    }, '<0.2');

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <section ref={sectionRef} className="relative w-full min-h-screen h-auto overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/carpet-uptic.mp4" type="video/mp4" />
      </video>

      {/* Overlay Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen py-20 lg:py-0 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Left Side - Main Heading */}
        <div ref={leftContentRef} className="w-full lg:w-1/2 lg:pr-8 mb-12 lg:mb-0">
          {/* TL;DR Badge */}
          <div className="inline-block mb-6 sm:mb-8">
            <div className="px-4 sm:px-5 py-1.5 sm:py-2 border border-neutral-600 rounded-full">
              <span className="text-neutral-400 text-xs sm:text-sm tracking-wide">TL;DR</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-neutral-500 leading-tight">
            If you only read one thing,{' '}
            <span className="font-normal text-white">make it this.</span>
          </h1>
        </div>

        {/* Right Side - Description Card */}
        <div ref={rightContentRef} className="w-full lg:w-1/2 lg:pl-8">
          <div className="bg-black/50 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-zinc-700/20">
            <p className="text-neutral-400 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed mb-6 sm:mb-8">
              Your fractional product team, full-time engineering partner, and zero-BS cloud experts.{' '}
              <span className="text-white font-medium">
                We build it, ship it, and support it
              </span>
              —with speed, clarity, and technical ownership.
            </p>

            {/* CTA Button */}
            <button className="w-full px-6 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-lg btn-primary">
              Book a 30-minute consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}