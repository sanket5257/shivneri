'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SHOWREEL =
  'https://cdn.prod.website-files.com/656a0c59bc8ad4e5fa92b68e%2F6863ef7ac0ea8a4fea01cff0_Showre%CC%81el-transcode.mp4';

const TEXT =
  'We help ambitious companies ship faster, scale smarter, and modernize without compromise.';
const WORDS = TEXT.split(' ');

const ScrollTextEffect = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = headingRef.current!.querySelectorAll('.mt-word');

      // Each word flies in from the right and settles into place as the heading
      // scrolls into view — same reveal as the About section, but tied to the
      // section's own scroll (no pin) so the text + video read as one block.
      gsap.fromTo(
        words,
        { opacity: 0, x: 140 },
        {
          opacity: 1,
          x: 0,
          ease: 'power2.out',
          stagger: 0.5,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            end: 'top 32%',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Modernize statement — word-by-word reveal */}
      <div className="mx-auto max-w-[1728px] px-6 pt-28 pb-16 md:px-12 md:pt-40 md:pb-24 lg:px-24">
        <h2
          ref={headingRef}
          className="max-w-6xl text-2xl font-semibold leading-[1.22] tracking-tight text-neutral-100 sm:text-3xl md:text-4xl"
        >
          {WORDS.map((word, i) => (
            <span
              key={i}
              className="mt-word inline-block will-change-transform"
              style={{ marginRight: '0.25em' }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Showreel video — same section + same max-width as the other sections */}
      <div className="mx-auto max-w-[1728px] px-6 pb-20 md:px-12 md:pb-28 lg:px-24">
        <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl md:h-[80vh] md:rounded-3xl">
          <video
            className="h-full w-full object-cover"
            src={SHOWREEL}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default ScrollTextEffect;
