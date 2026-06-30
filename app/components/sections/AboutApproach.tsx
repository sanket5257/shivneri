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
      'Shivneri is an AI-first product engineering studio. We build AI software, automation, and full-stack products for funded startups and scale-ups —',
  },
  { text: 'and we stay on to run and scale them.', accent: true },
  {
    text:
      'Not an agency or a body-shop. Just a small, senior team that',
  },
  { text: 'owns outcomes end to end.', accent: true },
];

const PARAGRAPHS = [
  'We work with founders, CTOs, and product leaders at funded startups and scale-ups — teams who need to ship fast and can’t afford handoffs, juniors, or disappearing freelancers.',
  'We build it, run it, and keep innovating — no handoffs, no bloat. Senior engineers who own delivery from first commit to production, and keep improving what we build.',
];

const CAPABILITIES = [
  {
    title: 'AI & Full-Stack Development',
    body:
      'Custom LLM apps, AI agents, and full-stack products — engineered for production, not just demos.',
  },
  {
    title: 'Cloud-Native Platforms',
    body:
      'Scalable foundations, internal developer platforms, and CI/CD pipelines that remove friction.',
  },
  {
    title: 'Run & Scale',
    body:
      'We run what we build — observability, automation, and continuous improvement, with no handoffs.',
  },
  {
    title: 'Security & DevOps',
    body:
      'App security, compliance, and cloud cost optimization — baked in from day one, on every build.',
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

        {/* ---- Lower block — spread across the full width ---- */}
        <div
          ref={bottomRef}
          className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10 lg:gap-12"
        >
          {/* Copy + button (left side) */}
          <div className="space-y-5 md:col-span-5 md:col-start-1">
            {PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-white">
                {p}
              </p>
            ))}

            <button type="button" className="btn-primary mt-2 text-sm">
              View Approach
            </button>
          </div>

          {/* Capabilities accordion (right column) */}
          <div className="border-b border-white/10 md:col-span-4 md:col-start-9">
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
