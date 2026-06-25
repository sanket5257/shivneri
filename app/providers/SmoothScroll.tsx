'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Premium smooth-scroll feel:
    //  - duration + expo-out easing gives a weighty, glide-to-a-stop motion
    //  - lerp is left off so the easing curve above drives the feel
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      gestureOrientation: 'vertical',
    });

    // Expose the instance so other components (infinite-loop reveal, pinned
    // sections) can read/drive scroll in sync with Lenis.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Keep GSAP ScrollTrigger perfectly in step with Lenis so pinned sections,
    // reveals and parallax never lag a frame behind the scroll position.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's single ticker instead of a separate rAF loop —
    // one clock for both scrolling and animation = no cross-loop stutter, which
    // is what gives that buttery, "premium" feel. lagSmoothing(0) keeps motion
    // tied to real time even if a frame is dropped.
    const raf = (time: number) => lenis.raf(time * 1000); // ticker time is seconds
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
