'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function useLenis() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenis.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up
    return () => {
      if (lenis.current) {
        lenis.current.destroy();
        lenis.current = null;
      }
    };
  }, []);

  return lenis.current;
}
