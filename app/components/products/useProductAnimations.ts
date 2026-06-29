'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal-on-scroll for the index grid cards (`.product-card`). Returns
 * `rootRef` to scope the GSAP context to the page. `deps` (the active filter)
 * re-runs the reveal when the visible set changes so newly mounted cards
 * animate in too.
 */
export function useProductAnimations(deps: unknown[] = []) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = (
      window as unknown as {
        lenis?: {
          on: (event: string, cb: () => void) => void;
          off: (event: string, cb: () => void) => void;
        };
      }
    ).lenis;
    const onScroll = () => ScrollTrigger.update();
    if (lenis) lenis.on('scroll', onScroll);

    let ctx: ReturnType<typeof gsap.context> | undefined;

    // Build reveals after layout/images settle so soft-navigation never leaves
    // cards stuck invisible (same hardening used elsewhere in the app).
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>('.product-card').forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: reduceMotion ? 0 : 56 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  once: true,
                  invalidateOnRefresh: true,
                },
              }
            );
          });
        }, rootRef);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { rootRef };
}
