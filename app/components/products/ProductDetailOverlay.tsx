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
 * Fullscreen detail view styled to match the rest of the site: black stage with
 * the product's looping video filling the screen, white text and rounded Liquid
 * Glass controls. The ◀ ▶ buttons and dash indicators move between PRODUCTS —
 * each one shows its own video (no still-image slides) — and a rounded "Info"
 * pill slides the details panel in. Esc / arrow keys are wired up; body scroll
 * is locked while open.
 */
export default function ProductDetailOverlay({
  products,
  activeIndex,
  onClose,
  onNavigate,
}: ProductDetailOverlayProps) {
  const isOpen = activeIndex !== null;
  const product = isOpen ? products[activeIndex] : null;

  // Details panel starts open so users see the product info up front; they can
  // close it to watch the video full-screen. State persists across products.
  const [infoOpen, setInfoOpen] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToProduct = useCallback(
    (dir: 1 | -1) => {
      if (activeIndex === null) return;
      const n = (activeIndex + dir + products.length) % products.length;
      onNavigate(n);
    },
    [activeIndex, products.length, onNavigate]
  );

  // Restart + play the video each time the active product changes. Switching
  // products swaps in a new <video> (keyed by id), so we (re)trigger playback
  // here rather than relying on autoplay, which can leave the new clip paused
  // on its first frame — looking like a static image.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [activeIndex]);

  // Lock body scroll + keyboard navigation while open (arrows move products).
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') goToProduct(1);
      else if (e.key === 'ArrowLeft') goToProduct(-1);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose, goToProduct]);

  if (!product || activeIndex === null) return null;

  const hasNav = products.length > 1;

  // Circular control using the site's Liquid Glass surface — its dark adaptive
  // tint keeps white icons legible over bright media.
  const iconBtn =
    'liquid-glass pointer-events-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-14';

  return (
    <Portal>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} — product detail`}
        className="fixed inset-0 z-[100] bg-black text-white"
      >
        {/* Fullscreen video stage — keyed by product so it remounts + replays */}
        <div className="absolute inset-0">
          {product.video ? (
            <video
              key={product.id}
              ref={videoRef}
              src={product.video}
              autoPlay
              loop
              muted
              playsInline
              aria-label={`${product.name} — product video`}
              className="absolute inset-0 h-full w-full select-none object-cover"
            />
          ) : (
            <img
              key={product.id}
              src={product.thumbnail}
              alt={product.name}
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover"
            />
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
            className="liquid-glass pointer-events-auto group flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm tracking-wide text-white transition-transform hover:scale-105"
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
              className="liquid-glass pointer-events-auto cursor-pointer rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-[2]">Info</span>
            </button>
          )}
        </div>

        {/* Bottom chrome — container is pointer-events-none so empty areas pass
            clicks through; each control opts back in with pointer-events-auto.
            On md+ it shifts left while the details panel is open so the dashes,
            name and arrows stay visible beside the panel instead of behind it. */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 px-6 pb-7 transition-[padding] duration-500 ease-out sm:px-10 ${
            infoOpen ? 'md:pr-[29rem]' : ''
          }`}
        >
          {/* Dash indicators — one per product, active = current */}
          {hasNav && (
            <div className="mb-6 flex justify-center gap-2">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onNavigate(i)}
                  aria-label={`Go to ${p.name}`}
                  aria-current={i === activeIndex}
                  className="pointer-events-auto cursor-pointer py-2"
                >
                  <span
                    className={`block h-0.5 w-9 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end justify-between gap-6">
            {/* Name + counter */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] opacity-70">
                {product.tagline} · {product.sector}
              </p>
              <h2 className="mt-2 text-2xl font-semibold leading-none tracking-tight sm:text-3xl">
                {product.name}
              </h2>
              <span className="mt-3 block text-xs tabular-nums opacity-70">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(products.length).padStart(2, '0')}
              </span>
            </div>

            {/* Prev / next PRODUCT */}
            {hasNav && (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => goToProduct(-1)}
                  aria-label="Previous product"
                  className={iconBtn}
                >
                  <svg viewBox="0 0 24 24" className="relative z-[2] h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goToProduct(1)}
                  aria-label="Next product"
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
