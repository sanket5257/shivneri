'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the work index motion:
 *  - `.work-row` reveal-on-scroll
 *  - gallery marquees (alternating direction, pause on hover)
 *
 * Returns `rootRef` to scope the GSAP context and `setMarqueeRef(index)` — a
 * ref callback each ProjectRow passes to its marquee track.
 */
export function useWorkAnimations() {
  const rootRef = useRef<HTMLDivElement>(null);
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setMarqueeRef = (index: number) => (el: HTMLDivElement | null) => {
    marqueeRefs.current[index] = el;
  };

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
    // rows stuck invisible (same hardening used elsewhere in the app).
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        ctx = gsap.context(() => {
          // Row reveal on scroll
          gsap.utils.toArray<HTMLElement>('.work-row').forEach((row) => {
            gsap.fromTo(
              row,
              { opacity: 0, y: 48 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 82%',
                  once: true,
                  invalidateOnRefresh: true,
                },
              }
            );
          });

          // Gallery marquees — each track holds two identical image sets, so
          // an xPercent shift of one set wraps seamlessly. Alternate rows run
          // the opposite direction. Pause on hover.
          const cleanups: Array<() => void> = [];
          marqueeRefs.current.forEach((track, i) => {
            if (!track || reduceMotion) return;
            const reverse = i % 2 === 1;
            const tween = gsap.fromTo(
              track,
              { xPercent: reverse ? -50 : 0 },
              {
                xPercent: reverse ? 0 : -50,
                duration: 55,
                ease: 'none',
                repeat: -1,
              }
            );
            const pause = () => tween.pause();
            const play = () => tween.play();
            track.addEventListener('mouseenter', pause);
            track.addEventListener('mouseleave', play);
            cleanups.push(() => {
              track.removeEventListener('mouseenter', pause);
              track.removeEventListener('mouseleave', play);
            });
          });

          return () => cleanups.forEach((fn) => fn());
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
  }, []);

  return { rootRef, setMarqueeRef };
}
