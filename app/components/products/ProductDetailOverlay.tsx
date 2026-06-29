'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Product } from './types';
import ProductInfoPanel from './ProductInfoPanel';
import Portal from '../ui/Portal';

interface ProductDetailOverlayProps {
  products: Product[];
  /** Index into `products` of the open product, or null when closed. */
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Fullscreen detail view styled to match the rest of the site: black stage,
 * white text and rounded glass controls — circular slide buttons bottom-right,
 * dash indicators centered (active = white), a rounded "Info" pill that slides
 * the details panel in, and prev/next-product controls. Controls sit on dark
 * translucent fills so they stay readable over bright media. Esc / arrow keys
 * are wired up; body scroll is locked while open.
 */
export default function ProductDetailOverlay({
  products,
  activeIndex,
  onClose,
  onNavigate,
}: ProductDetailOverlayProps) {
  const isOpen = activeIndex !== null;
  const product = isOpen ? products[activeIndex] : null;

  const [slide, setSlide] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset slideshow + panel whenever a different product opens. Adjusting state
  // during render (vs. an effect) avoids a flash of the previous slide.
  const [prevIndex, setPrevIndex] = useState(activeIndex);
  if (activeIndex !== prevIndex) {
    setPrevIndex(activeIndex);
    setSlide(0);
    setInfoOpen(false);
  }

  // Media list for the slideshow: the looping product video (if any) leads,
  // followed by the still images.
  const media = product
    ? [
        ...(product.video
          ? [{ type: 'video' as const, src: product.video }]
          : []),
        ...product.gallery.map((src) => ({ type: 'image' as const, src })),
      ]
    : [];

  const nextSlide = useCallback(
    () => setSlide((s) => (s + 1) % media.length),
    [media.length]
  );
  const prevSlide = useCallback(
    () => setSlide((s) => (s - 1 + media.length) % media.length),
    [media.length]
  );

  const goToProduct = useCallback(
    (dir: 1 | -1) => {
      if (activeIndex === null) return;
      const n = (activeIndex + dir + products.length) % products.length;
      onNavigate(n);
    },
    [activeIndex, products.length, onNavigate]
  );

  // Play the product video only while it's the active slide; pause it otherwise
  // (and reset to the start) so it doesn't keep running behind the stills.
  const videoIsActive = isOpen && media[slide]?.type === 'video';
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (videoIsActive) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [videoIsActive]);

  // Lock body scroll + keyboard navigation while open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose, nextSlide, prevSlide]);

  if (!product || activeIndex === null) return null;

  // Circular control using the site's Liquid Glass surface — its dark adaptive
  // tint keeps white icons legible over bright media.
  const iconBtn =
    'liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-14';

  return (
    <Portal>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} — product detail`}
        className="fixed inset-0 z-[100] bg-black text-white"
      >
        {/* Slideshow stage */}
        <div className="absolute inset-0">
          {media.map((item, i) =>
            item.type === 'video' ? (
              <video
                key={`${product.id}-${i}`}
                ref={videoRef}
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                aria-label={`${product.name} — product video`}
                className={`absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-700 ease-out ${
                  i === slide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              <img
                key={`${product.id}-${i}`}
                src={item.src}
                alt={`${product.name} — frame ${i + 1}`}
                draggable={false}
                className={`absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-700 ease-out ${
                  i === slide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )
          )}
          {/* Readability gradients for the controls */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/75 to-transparent" />
        </div>

        {/* Top bar: back (left) + info toggle (right). The container is
            pointer-events-none so its transparent area never intercepts clicks
            meant for layers below (e.g. the info panel's close button); only the
            actual buttons opt back in. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10">
          <button
            type="button"
            onClick={onClose}
            className="liquid-glass pointer-events-auto group flex items-center gap-2 rounded-full px-4 py-2 text-sm tracking-wide text-white transition-transform hover:scale-105"
          >
            <span className="relative z-[2] flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </span>
          </button>

          {/* Open trigger only — the panel carries its own close button, so we
              hide this while it's open to avoid two stacked controls. */}
          {!infoOpen && (
            <button
              type="button"
              onClick={() => setInfoOpen(true)}
              aria-expanded={infoOpen}
              className="liquid-glass pointer-events-auto rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-[2]">Info</span>
            </button>
          )}
        </div>

        {/* Bottom chrome — container is pointer-events-none so empty areas pass
            clicks through; each control opts back in with pointer-events-auto. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-6 pb-7 sm:px-10">
          {/* Dash slide indicators — centered */}
          {media.length > 1 && (
            <div className="mb-6 flex justify-center gap-2">
              {media.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === slide}
                  className="pointer-events-auto py-2"
                >
                  <span
                    className={`block h-0.5 w-9 rounded-full transition-all duration-300 ${
                      i === slide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end justify-between gap-6">
            {/* Name + counter + product nav */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] opacity-70">
                {product.tagline} · {product.sector}
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-none tracking-tight sm:text-3xl">
                {product.name}
              </h2>
              <div className="pointer-events-auto mt-3 flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => goToProduct(-1)}
                  aria-label="Previous product"
                  className="transition-colors hover:text-white/70"
                >
                  Prev
                </button>
                <span className="tabular-nums opacity-70">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(products.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => goToProduct(1)}
                  aria-label="Next product"
                  className="transition-colors hover:text-white/70"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Square slide buttons — bottom right */}
            {media.length > 1 && (
              <div className="pointer-events-auto flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className={iconBtn}
                >
                  <svg viewBox="0 0 24 24" className="relative z-[2] h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className={iconBtn}
                >
                  <svg viewBox="0 0 24 24" className="relative z-[2] h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <ProductInfoPanel
          product={product}
          open={infoOpen}
          onClose={() => setInfoOpen(false)}
        />
      </div>
    </Portal>
  );
}
