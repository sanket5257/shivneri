'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Mvp from '../components/sections/Mvp';
import Careears from '../components/sections/Careears';
import Contact from '../components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function AboutLanding() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const [openWho, setOpenWho] = useState<number | null>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero text — runs immediately (no scroll dependency). fromTo with an
    // explicit opacity:1 end is deterministic, so soft-navigating into the page
    // can never leave it stuck at the "from" (invisible) state.
    const heroElements = heroRef.current?.querySelectorAll(
      '.hero-content > :not(button)'
    );
    if (heroElements && heroElements.length > 0) {
      gsap.fromTo(
        heroElements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }

    // Keep ScrollTrigger in sync with Lenis smooth scroll.
    const lenis = (window as unknown as { lenis?: { on: Function; off: Function } })
      .lenis;
    const onScroll = () => ScrollTrigger.update();
    if (lenis) lenis.on('scroll', onScroll);

    let ctx: ReturnType<typeof gsap.context> | undefined;

    // Build scroll-driven reveals AFTER layout/images settle. On client-side
    // navigation the new page isn't measured yet when the effect first runs, so
    // we wait two frames and then refresh — otherwise the trigger positions are
    // stale and the reveal gets stuck invisible (only a hard refresh fixed it).
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          gsap.fromTo(
            '.section-title',
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: servicesRef.current,
                start: 'top 78%',
                once: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        ScrollTrigger.refresh();
      })
    );

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      if (lenis) lenis.off('scroll', onScroll);
      ctx?.revert();
    };
  }, []);

  // Hero photo strip — same assets/order as the reference, bottom-aligned with
  // staggered heights (width is fixed at 461; only height varies per tile).
  const heroImages = [
    { src: '/assets/images/about-hero/hero-1.jpg', h: 417 },
    { src: '/assets/images/about-hero/hero-3.jpg', h: 353 },
    { src: '/assets/images/about-hero/hero-4.jpg', h: 305 },
    { src: '/assets/images/about-hero/hero-5.jpg', h: 359 },
    { src: '/assets/images/about-hero/hero-6.jpg', h: 417 },
    { src: '/assets/images/about-hero/hero-7.jpg', h: 353 },
    { src: '/assets/images/about-hero/hero-8.jpg', h: 305 },
    { src: '/assets/images/about-hero/hero-9.jpg', h: 359 },
    { src: '/assets/images/about-hero/hero-10.jpg', h: 417 },
  ];

  const services = [
    {
      title: "Startups with big ideas",
      body:
        "We're your full-stack launchpad — from a blank repo to a shipped product. MVP to production in weeks, cloud-native from day one, and built to scale as you grow.",
    },
    {
      title: "Enterprises untangling old systems",
      body:
        "We refactor and modernize the mess without breaking what already works — legacy modernization, zero-downtime migrations, and the pipelines and automation that let you ship again.",
    },
    {
      title: "MSPs and IT teams",
      body:
        "We help you scale and automate without the burnout — workflow automation, reliable and observable infrastructure, and on-demand engineering when you need to move fast.",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-black text-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden bg-black pt-32 sm:pt-40 pb-12"
      >
        {/* Headline */}
        <div className="hero-content relative z-10 w-full max-w-[1728px] mx-auto px-6 md:px-12 lg:px-24">
          <h1 className="text-white font-semibold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[16ch]">
            Where exceptional people unite for the love of the craft.
          </h1>
        </div>

        {/* Infinite photo marquee — bottom-aligned, staggered heights */}
        <div className="relative z-10 mt-auto pt-20 sm:pt-28 lg:pt-36 w-full overflow-hidden">
          <div
            className="about-hero-marquee"
            style={{ ['--tile-w' as string]: 'clamp(180px, 28vw, 461px)' }}
          >
            {[...heroImages, ...heroImages].map((img, i) => (
              <div
                key={i}
                className="shrink-0 mr-2 overflow-hidden"
                style={{
                  width: 'var(--tile-w)',
                  aspectRatio: `461 / ${img.h}`,
                }}
              >
                <img
                  src={img.src}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="w-full h-full object-cover select-none"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section
        ref={servicesRef}
        className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32"
      >
        <div className="w-full max-w-[1728px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — heading + copy */}
          <div className="section-title">
            <span className="inline-block px-5 py-2 rounded-full border border-neutral-700 text-neutral-400 text-sm mb-8">
              Who We Are
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
              Not Your Average{' '}
              <span className="text-neutral-500">Dev &amp; Cloud Shop</span>
            </h2>

            <p className="text-neutral-400 max-w-xl text-base sm:text-lg mt-6 sm:mt-8 leading-relaxed">
              We&apos;re the team companies call when they need modern software
              that actually ships. From cloud-native builds to pipelines and
              automation, we architect your future while fixing what&apos;s holding
              you back.
            </p>
          </div>

          {/* Right — who we build for (accordion) */}
          <div className="lg:pt-4">
            <p className="text-sm text-neutral-500 mb-2">Who we build for</p>
            <div className="border-b border-white/10">
              {services.map((service, index) => {
                const isOpen = openWho === index;
                return (
                  <div key={index} className="border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setOpenWho((v) => (v === index ? null : index))}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`text-2xl md:text-3xl font-light tracking-tight transition-colors duration-300 ${
                          isOpen ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </span>

                      {/* animated +  →  – toggle */}
                      <span
                        className={`relative flex h-5 w-5 flex-shrink-0 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? 'rotate-90' : 'rotate-0'
                        }`}
                      >
                        <span
                          className={`absolute h-[1.5px] w-4 rounded-full transition-colors duration-300 ${
                            isOpen ? 'bg-white' : 'bg-neutral-500 group-hover:bg-white'
                          }`}
                        />
                        <span
                          className={`absolute h-4 w-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isOpen ? 'scale-y-0 bg-white' : 'scale-y-100 bg-neutral-500 group-hover:bg-white'
                          }`}
                        />
                      </span>
                    </button>

                    {/* content-aware height animation */}
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`pb-6 pr-8 max-w-md text-base leading-relaxed text-neutral-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isOpen ? 'translate-y-0' : '-translate-y-1'
                          }`}
                        >
                          {service.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
              <Mvp/>
              <Contact/>
              <Careears/>
      {/* Additional spacing */}
    </div>
  );
}