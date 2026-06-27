'use client';

import React, { useRef, useState } from 'react';
import OurApproachSection from '../components/sections/OurApproch';
import CTA from '../components/sections/CTA';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 'ux-ui',
    title: 'UX/UI Design',
    subtitle: 'Design',
    description:
      'We create visually stunning, user-friendly designs that enhance engagement and deliver a smooth digital experience.',
    videoSrc: '/assets/Web_design.mp4',
    features: [
      'User research & personas',
      'Competitors analysis',
      'Wireframes & prototypes',
      'Interactive & motion design',
      'Mobile-optimized design',
    ],
  },
  {
    id: 'development',
    title: 'Web Development',
    subtitle: 'Development',
    description:
      'We build robust technical foundations that bring creative concepts to life while ensuring scalability for your growing business.',
    videoSrc: '/assets/development.mp4',
    features: [
      'Custom web development',
      'Full-stack development',
      'CMS integration',
      'E-commerce development',
      'Performance optimization',
    ],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Applications',
    subtitle: 'iOS & Android',
    description:
      'We develop high-performance mobile applications that provide seamless user experiences across all devices and platforms.',
    videoSrc: '/assets/mobile_application.mp4',
    features: [
      'Native iOS & Android apps',
      'Cross-platform development',
      'UI/UX mobile design',
      'App store optimization',
      'API integration',
    ],
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    subtitle: 'Animation & Visuals',
    description:
      'We create captivating motion graphics that bring your brand to life and communicate complex ideas in an engaging way.',
    videoSrc: '/assets/motion_graphics.mp4',
    features: [
      '2D & 3D animation',
      'Explainer videos',
      'Logo animations',
      'Motion graphics for web',
      'Social media content',
    ],
  },
  {
    id: 'branding',
    title: 'Branding',
    subtitle: 'Brand Identity',
    description:
      'We craft memorable brand identities that resonate with your audience and establish a strong market presence.',
    videoSrc: '/assets/branding.mp4',
    features: [
      'Brand strategy',
      'Logo & visual identity',
      'Brand guidelines',
      'Marketing collateral',
      'Brand positioning',
    ],
  },
  {
    id: 'video-production',
    title: 'Video Production',
    subtitle: 'Filming & Editing',
    description:
      "We produce high-quality video content that tells your brand's story and captivates your target audience.",
    videoSrc: '/assets/video_editing.mp4',
    features: [
      'Corporate videos',
      'Product demos',
      'Testimonial videos',
      'Social media content',
      'Post-production editing',
    ],
  },
];

function FeatureList({
  features,
  className = '',
}: {
  features: string[];
  className?: string;
}) {
  return (
    <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 ${className}`}>
      {features.map((feature) => (
        <li
          key={feature}
          className="flex items-center gap-2.5 text-sm text-neutral-300"
        >
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white" />
          {feature}
        </li>
      ))}
    </ul>
  );
}

export default function ServicesPage() {
  const [active, setActive] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Hover-to-open only makes sense on devices with a real pointer. On touch
  // (mobile) we rely solely on tap/click so the dropdown opens reliably.
  const canHover = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;

  // On tap/click, toggle the service. Opening keeps its title in view so the
  // panel reveals BELOW it. Without this, collapsing an open item higher up
  // yanks the page upward and the tapped service opens above the fold.
  const handleSelect = (i: number) => {
    const prev = active;

    // Tapping the already-open service closes it.
    if (prev === i) {
      setActive(null);
      return;
    }

    setActive(i);

    // Height of the panel that is about to collapse, if it sits above the
    // tapped one — that space disappears, so subtract it from the scroll target.
    let removedAbove = 0;
    if (prev !== null && prev < i) {
      removedAbove = panelRefs.current[prev]?.offsetHeight ?? 0;
    }

    const el = itemRefs.current[i];
    if (!el) return;
    const headerOffset = 96;
    const target = Math.max(
      0,
      el.getBoundingClientRect().top + window.scrollY - removedAbove - headerOffset
    );

    const lenis = (
      window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }
    ).lenis;
    if (lenis?.scrollTo) lenis.scrollTo(target, { duration: 0.6 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ---- Hero header ---- */}
      <section className="w-full max-w-[1728px] mx-auto px-6 md:px-12 lg:px-24 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
        <div className="mb-6 sm:mb-8">
          <span className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-neutral-700 text-xs sm:text-sm text-neutral-400">
            Development from UI to AI
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-5 sm:mb-6">
          Build Bold.
          <br />
          <span className="text-neutral-500">Modernize Smart.</span>
        </h1>

        <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From greenfield apps to SaaS modernization, we design, build, and
          scale software that&apos;s fast, secure, and built for what&apos;s next.
        </p>
      </section>

      {/* ---- Interactive service showcase — hover a title to reveal it below ---- */}
      <section className="w-full max-w-[1728px] mx-auto px-6 md:px-12 lg:px-24 pb-20 sm:pb-28 md:pb-32">
        <div className="flex flex-col">
          {services.map((service, i) => {
            const isActive = i === active;
            return (
              <div
                key={service.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="border-t border-white/10 last:border-b last:border-white/10"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(i)}
                  onMouseEnter={() => canHover() && setActive(i)}
                  onFocus={() => canHover() && setActive(i)}
                  aria-expanded={isActive}
                  className="group flex w-full cursor-pointer items-center gap-4 sm:gap-6 py-5 sm:py-6 lg:py-7 text-left"
                >
                  <span
                    className={`font-mono text-xs sm:text-sm tabular-nums transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-600'
                    }`}
                  >
                    0{i + 1}
                  </span>

                  <span
                    className={`flex-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight transition-colors duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-neutral-500 group-hover:text-neutral-300'
                    }`}
                  >
                    {service.title}
                  </span>

                  {/* + → – animated toggle */}
                  <span
                    className={`relative flex h-5 w-5 flex-shrink-0 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? 'rotate-90' : 'rotate-0'
                    }`}
                  >
                    <span
                      className={`absolute h-[1.5px] w-4 rounded-full transition-colors duration-300 ${
                        isActive
                          ? 'bg-white'
                          : 'bg-neutral-600 group-hover:bg-neutral-400'
                      }`}
                    />
                    <span
                      className={`absolute h-4 w-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? 'scale-y-0 bg-white'
                          : 'scale-y-100 bg-neutral-600 group-hover:bg-neutral-400'
                      }`}
                    />
                  </span>
                </button>

                {/* Expanding panel — revealed directly below the title */}
                <div
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center pb-8 lg:pb-12">
                      {/* Media */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
                        {isActive && (
                          <video
                            key={service.id}
                            src={service.videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                          />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-neutral-200 backdrop-blur-md">
                          {service.subtitle}
                        </span>
                      </div>

                      {/* Details */}
                      <div>
                        <p className="mb-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-neutral-400">
                          {service.description}
                        </p>
                        <FeatureList features={service.features} className="mb-7" />
                        <button className="btn-primary text-sm sm:text-base">
                          View Project
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <OurApproachSection />
      <CTA />
    </div>
  );
}
