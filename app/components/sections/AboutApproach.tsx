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
      'Shivneri Systems builds software for startups and enterprises alike — shipping cloud-native platforms and modernizing the legacy systems holding teams back. The focus stays the same:',
  },
  { text: 'engineering that scales,', accent: true },
  {
    text:
      'automation that removes friction, and a team that owns delivery from',
  },
  { text: 'first commit to production.', accent: true },
];

const PARAGRAPHS = [
  'We’re a lean, global crew of engineers, architects, and cloud experts. We design and build full-stack applications, modernize legacy systems, and stand up the platforms and pipelines that let teams ship with confidence.',
  'We build it, run it, and keep innovating — from secure cloud foundations to scalable applications and automation. No handoffs, no bloated teams, no context lost. Just deeply invested engineers who own delivery end to end.',
];

const CAPABILITIES = [
  {
    title: 'Development',
    body:
      'Full-stack engineering — applications, APIs, and services built to ship fast and scale cleanly.',
  },
  {
    title: 'Platforms',
    body:
      'Cloud-native foundations, internal developer platforms, and CI/CD pipelines that remove friction.',
  },
  {
    title: 'Operate & Innovate',
    body:
      'We run what we build — observability, automation, and continuous improvement, with no handoffs.',
  },
  {
    title: 'Security & Cloud',
    body:
      'App security, compliance, and cloud cost optimization baked in from day one.',
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
