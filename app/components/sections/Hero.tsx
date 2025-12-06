"use client";

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BookingModal = dynamic(() => import('../BookingModal'), { ssr: false });

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function UpticHero() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements in sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate the badge
    tl.fromTo(
      '.hero-badge',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    // Animate the heading
    .fromTo(
      '.hero-heading',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      '-=0.4'
    )
    // Animate the description text
    .fromTo(
      '.hero-text',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    )
    // Animate the buttons
    .fromTo(
      '.hero-button',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.15,
        ease: 'back.out(1.4)'
      },
      '-=0.4'
    );

    // Parallax effect on scroll
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, []);

  return (
    <>
      <div className="h-screen bg-[#131214] text-white relative overflow-hidden">
        <video className='object-cover h-full w-full' src="/assets/Homepage X Hero Video (1).mp4" autoPlay loop muted></video>
        
        {/* Hero Content */}
        <div ref={heroRef} className="absolute top-30 sm:top-10 md:top-20 right-0 left-0 bottom-0 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-20 md:pb-40 text-center">
          <div className="mb-6 sm:mb-8 overflow-hidden">
            <span className="hero-badge inline-block px-4 sm:px-6 py-1.5 sm:py-2 border border-neutral-700 rounded-full text-xs sm:text-sm text-neutral-300">
              Modern Full-Stack Development & Engineering
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 sm:mb-6 leading-tight">
            <div className="overflow-hidden">
              <span className="hero-heading inline-block">Build Faster. Deploy</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-heading inline-block">Smarter. Scale Effortlessly.</span>
            </div>
          </h1>
          
          <div className="overflow-hidden">
            <p ref={textRef} className="hero-text text-sm text-neutral-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Advanced software engineering using next-generation architecture and technologies to
              <br className="hidden md:block" />
              power your applications, data, AI, and automation. Speed and scale—without limits.
            </p>
          </div>
          
          <div ref={buttonRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button 
              className="hero-button btn-primary w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base"
              onClick={() => setIsModalOpen(true)}
            >
              Book a meeting
            </button>
            <Link 
              href="/services" 
              className="hero-button w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 border border-neutral-700 rounded-lg hover:border-neutral-500 transition flex items-center justify-center space-x-2 group"
            >
              <span>Our services</span>
              <span className="transform group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>
        </div>
        
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}