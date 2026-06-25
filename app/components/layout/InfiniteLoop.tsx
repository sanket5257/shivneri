'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * "Infinite site" loop for the homepage.
 *
 * A static clone of the Hero's first screen is rendered as a FIXED, full-screen
 * layer sitting *behind* the page content (lower z-index), kept hidden by the
 * opaque content + footer above it.
 *
 * When the visitor reaches the bottom of the footer, a progress bar pinned to
 * the footer's bottom edge fills up from continued downward-scroll intent —
 * while the footer stays fully in view (the hero is NOT revealed yet). Only once
 * the bar is FULL does the footer fade out to reveal the fixed hero behind it
 * and the scroll snaps back to the top — a seamless loop back to the Hero.
 */
export default function InfiniteLoop() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== '/') return;

    type Lenis = {
      scrollTo: (t: number, o?: object) => void;
      on: (e: string, cb: () => void) => void;
      off: (e: string, cb: () => void) => void;
    };
    const getLenis = () =>
      (window as unknown as { lenis?: Lenis }).lenis;

    // How much downward-scroll "effort" (in px of wheel/touch delta) is needed
    // to fill the bar completely.
    const FILL_DISTANCE = 1100;

    let progress = 0; // 0 → 1
    let lastIntentAt = -Infinity;
    let looping = false;

    const atBottom = () =>
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;

    const render = () => {
      const el = progressRef.current;
      const fill = fillRef.current;
      if (!el || !fill) return;
      fill.style.width = `${progress * 100}%`;
      el.style.opacity = atBottom() || progress > 0 ? '1' : '0';
    };

    const triggerLoop = () => {
      if (looping) return;
      looping = true;
      progress = 1;
      render();

      // Fade the footer out to reveal the fixed hero behind it, then snap the
      // scroll to the top (the real Hero) — so the loop reads as seamless.
      const footer = document.querySelector('footer') as HTMLElement | null;
      if (footer) {
        footer.style.transition = 'opacity 0.45s ease';
        footer.style.opacity = '0';
      }
      window.setTimeout(() => {
        getLenis()?.scrollTo(0, { immediate: true });
        if (footer) {
          footer.style.transition = 'none';
          footer.style.opacity = '1';
        }
        progress = 0;
        looping = false;
        render();
      }, 470);
    };

    const addIntent = (amount: number) => {
      if (looping || !atBottom()) return;
      lastIntentAt = performance.now();
      progress = Math.min(1, progress + amount / FILL_DISTANCE);
      render();
      if (progress >= 1) triggerLoop();
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) addIntent(e.deltaY);
    };
    let lastTouchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? null;
      if (lastTouchY !== null && y !== null && y < lastTouchY) {
        addIntent(lastTouchY - y);
      }
      lastTouchY = y;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'End', ' ', 'Spacebar'].includes(e.key)) {
        addIntent(140);
      }
    };

    // Drain the bar back down when the visitor stops pushing (so it only fills
    // with sustained intent) and reset it the moment they scroll away.
    let raf = 0;
    const tick = () => {
      if (!looping) {
        if (!atBottom() && progress > 0) {
          progress = 0;
          render();
        } else if (
          progress > 0 &&
          performance.now() - lastIntentAt > 130
        ) {
          progress = Math.max(0, progress - 0.02);
          render();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    // Keep the bar's visibility in sync while scrolling (Lenis drives scroll).
    const handleScroll = () => render();
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

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
      detach();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [pathname]);

  if (pathname !== '/') return null;

  return (
    <>
      {/* Fixed hero layer — sits behind the content/footer and is revealed (by
          fading the footer) when the loop fires. */}
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

      {/* Loop progress bar — pinned to the bottom of the footer. Fills from
          continued downward scroll once the footer is fully in view; the loop
          only fires when it's full. */}
      <div
        ref={progressRef}
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex flex-col items-center gap-2 opacity-0 transition-opacity duration-300 ease-out"
        style={{ opacity: 0 }}
      >
        <span className="flex items-center gap-2 text-[10px] font-light uppercase tracking-[0.25em] text-white/70">
          Keep scrolling to start over
          <span className="loop-arrow text-white/70">&darr;</span>
        </span>
        <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/15 sm:w-56">
          <div ref={fillRef} className="h-full w-0 rounded-full bg-white" />
        </div>
      </div>

      <style>{`
        @keyframes loopArrowBob {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(3px); opacity: 1; }
        }
        .loop-arrow {
          display: inline-block;
          animation: loopArrowBob 1.4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
