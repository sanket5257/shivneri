'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * "Infinite site" loop for the homepage.
 *
 * A static clone of the Hero's first screen is rendered as a FIXED, full-screen
 * layer sitting *behind* the page content (lower z-index). The page content and
 * footer are opaque and sit above it, so the hero stays hidden during normal
 * scrolling. A full-height spacer after the footer gives the scroll room needed
 * to slide the footer up and off — progressively revealing the fixed hero
 * underneath (a smooth, seam-free reveal since the footer simply uncovers it).
 * Once the bottom is reached (hero fully revealed, identical to the real Hero),
 * we snap the scroll back to 0 for a seamless loop.
 */
export default function InfiniteLoop() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== '/') return;

    type Lenis = {
      scrollTo: (t: number, o?: object) => void;
      on: (e: string, cb: () => void) => void;
      off: (e: string, cb: () => void) => void;
    };
    const getLenis = () => (window as unknown as { lenis?: Lenis }).lenis;

    const handleScroll = () => {
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      // At the bottom the fixed hero fully fills the viewport — identical to the
      // real Hero at the top, so snapping to 0 is seamless.
      if (atBottom) {
        getLenis()?.scrollTo(0, { immediate: true });
      }
    };

    // Lenis (its virtual scroll doesn't emit native scroll events) is created by
    // SmoothScroll's effect, which runs after this one — poll until it exists.
    let detach = () => {};
    let tries = 0;
    const id = window.setInterval(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.on('scroll', handleScroll);
        detach = () => lenis.off('scroll', handleScroll);
        window.clearInterval(id);
      } else if (++tries > 100) {
        window.clearInterval(id);
      }
    }, 50);

    return () => {
      window.clearInterval(id);
      detach();
    };
  }, [pathname]);

  if (pathname !== '/') return null;

  return (
    <>
      {/* Fixed hero layer — sits behind the content/footer and is revealed as
          the footer scrolls up over it. */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-[#131214] text-white overflow-hidden pointer-events-none"
      >
        <video
          className="object-cover h-full w-full"
          src="/assets/Homepage X Hero Video (1).mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Hero content (static mirror of the real Hero) */}
        <div className="absolute top-30 sm:top-10 md:top-20 right-0 left-0 bottom-0 mx-auto px-6 md:px-12 lg:px-24 pt-20 sm:pt-32 pb-20 md:pb-40 text-center">
          <div className="mb-6 sm:mb-8">
            <span className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 border border-neutral-700 rounded-full text-xs sm:text-sm text-neutral-300">
              Modern Full-Stack Development &amp; Engineering
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 sm:mb-6 leading-tight">
            <div>
              <span className="inline-block">Build Faster. Deploy</span>
            </div>
            <div>
              <span className="inline-block">Smarter. Scale Effortlessly.</span>
            </div>
          </h1>

          <p className="text-sm text-neutral-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Advanced software engineering using next-generation architecture and technologies to
            <br className="hidden md:block" />
            power your applications, data, AI, and automation. Speed and scale—without limits.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <span className="btn-primary w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base">
              Book a meeting
            </span>
            <Link
              href="/services"
              className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 border border-neutral-700 rounded-lg flex items-center justify-center space-x-2 group"
            >
              <span className="relative z-10">Our services</span>
              <span className="relative z-10">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll spacer: lets the footer slide up and off, revealing the fixed
          hero behind it. Transparent, so the hero shows through. */}
      <div ref={ref} className="relative h-screen" />
    </>
  );
}
