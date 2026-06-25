'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* -------------------------------------------------------------------------- */
/*  Content — edit copy here                                                  */
/* -------------------------------------------------------------------------- */

// Heading split into segments; `accent` segments render in a muted grey
// (matching the reference), everything else reveals to near-white. Punctuation
// is glued to the preceding word so spacing stays correct.
const HEADING: { text: string; accent?: boolean }[] = [
  {
    text:
      "I've built digital experiences for established organisations, startups, and everything in between. The focus stays the same:",
  },
  { text: 'systems that scale,', accent: true },
  {
    text:
      'solving the communication problems that actually matter, and keeping',
  },
  { text: 'people first', accent: true },
  { text: 'throughout the entire process.' },
];

const PARAGRAPHS = [
  'I design digital experiences that work for the people using them and the teams maintaining them. Start with what users actually need, map flows, test early, build interfaces that don’t need manuals.',
  'The work spans UX, interaction design, information architecture, and brand evolution. Design for real conditions. Messy ones. If users get lost or the client can’t update content without breaking something, that’s a problem. Good design holds up when things get complicated.',
];

const CAPABILITIES = [
  {
    title: 'Strategy',
    body:
      'Positioning, product direction, and the roadmap that gets you from idea to shipped.',
  },
  {
    title: 'User Experience',
    body:
      'Research, flows, and interfaces that feel obvious to the people using them.',
  },
  {
    title: 'Design',
    body:
      'Visual systems and interaction detail that hold up under real-world conditions.',
  },
  {
    title: 'Interaction',
    body:
      'Motion and micro-interactions that make the product feel alive and responsive.',
  },
];

// Flatten the heading into individual words, each carrying its accent flag.
const WORDS = HEADING.flatMap((seg) =>
  seg.text
    .split(' ')
    .filter(Boolean)
    .map((w) => ({ w, accent: !!seg.accent }))
);

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function AboutApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Keep ScrollTrigger in sync with Lenis smooth scroll so the pin is smooth.
    const lenis = (window as unknown as { lenis?: { on: Function; off: Function } })
      .lenis;
    const onScroll = () => ScrollTrigger.update();
    if (lenis) lenis.on('scroll', onScroll);

    let ctx: ReturnType<typeof gsap.context> | undefined;

    // Build after layout/fonts settle so the pin reserves the correct scroll
    // distance (avoids a zero-height pin-spacer in dev StrictMode re-mounts).
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          const words = headingRef.current!.querySelectorAll('.aa-word');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=2600', // length of the pinned scroll
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // 1) Heading builds word by word — each word flies in from the
          //    right and settles into place as you scroll (no grey reveal).
          tl.fromTo(
            words,
            { opacity: 0, x: 140 },
            { opacity: 1, x: 0, ease: 'power2.out', duration: 1, stagger: 0.6 }
          );

          // 2) Once the line lands, the lower block (copy + capabilities) rises.
          tl.from(
            bottomRef.current,
            { opacity: 0, y: 70, duration: 4, ease: 'power2.out' },
            '>0.6'
          );
        }, sectionRef);

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

  return (
    <section
      ref={sectionRef}
      className="aa-section relative w-full overflow-hidden bg-black text-white"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1728px] flex-col justify-center gap-14 px-6 py-24 md:gap-20 md:px-12 lg:px-24">
        {/* ---- Word-by-word heading ---- */}
        <h2
          ref={headingRef}
          className="max-w-6xl text-2xl font-semibold leading-[1.22] tracking-tight text-neutral-100 sm:text-3xl md:text-4xl"
        >
          {WORDS.map((item, i) => (
            <span
              key={i}
              className="aa-word inline-block will-change-transform"
              style={{ marginRight: '0.26em' }}
            >
              {item.w}
            </span>
          ))}
        </h2>

        {/* ---- Lower block — shifted into the right half (empty left) ---- */}
        <div
          ref={bottomRef}
          className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10 lg:gap-12"
        >
          {/* Copy + button (right side, narrow) */}
          <div className="space-y-5 md:col-span-4 md:col-start-6">
            {PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-white">
                {p}
              </p>
            ))}

            <button type="button" className="btn-primary mt-2 text-sm">
              View Approach
            </button>
          </div>

          {/* Capabilities accordion (right column, narrower) */}
          <div className="border-b border-white/10 md:col-span-3 md:col-start-10">
            {CAPABILITIES.map((cap, i) => {
              const isOpen = open === i;
              return (
                <div key={cap.title} className="border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpen((v) => (v === i ? null : i))}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between py-4 text-left"
                  >
                    <span
                      className={`text-sm transition-colors duration-300 md:text-base ${
                        isOpen
                          ? 'text-white'
                          : 'text-neutral-300 group-hover:text-white'
                      }`}
                    >
                      {cap.title}
                    </span>

                    {/* animated +  →  – icon (rotates as it opens) */}
                    <span
                      className={`relative flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? 'rotate-90' : 'rotate-0'
                      }`}
                    >
                      <span
                        className={`absolute h-[1.5px] w-3.5 rounded-full transition-colors duration-300 ${
                          isOpen ? 'bg-white' : 'bg-neutral-500 group-hover:bg-white'
                        }`}
                      />
                      <span
                        className={`absolute h-3.5 w-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen
                            ? 'scale-y-0 bg-white'
                            : 'scale-y-100 bg-neutral-500 group-hover:bg-white'
                        }`}
                      />
                    </span>
                  </button>

                  {/* content-aware height animation via grid-rows 0fr → 1fr */}
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`pb-4 pr-6 text-xs leading-relaxed text-neutral-500 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? 'translate-y-0' : '-translate-y-1'
                        }`}
                      >
                        {cap.body}
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
  );
}
