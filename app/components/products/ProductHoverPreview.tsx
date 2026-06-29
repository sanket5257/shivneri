'use client';

import { useState } from 'react';
import type { Product } from './types';
import Portal from '../ui/Portal';

interface ProductHoverPreviewProps {
  /** The currently hovered product, or null when nothing is hovered. */
  product: Product | null;
}

/**
 * Page-level hover preview. When a grid card is hovered, the product name fades
 * in large and centered, and the product details slide in on the right.
 *
 * `mix-blend-mode: difference` is set on the *fixed centered container* (not the
 * inner <h2>), because mix-blend blends an element with the backdrop of its own
 * stacking context. A fixed/positioned element forms a stacking context, so the
 * blend must live on that element to invert against the grid images behind it —
 * putting it on a nested child would only blend against the (transparent)
 * wrapper. The right-side details sit on a separate, non-blended layer.
 *
 * Rendered through a Portal + pointer-events-none so it stays fixed to the
 * viewport and never blocks card hover. The last product is retained during
 * fade-out so text doesn't blank mid-transition.
 */
export default function ProductHoverPreview({
  product,
}: ProductHoverPreviewProps) {
  const active = product !== null;

  // Keep showing the last product while fading out (adjust state during render).
  const [shown, setShown] = useState(product);
  const [prev, setPrev] = useState(product);
  if (product !== prev) {
    setPrev(product);
    if (product) setShown(product);
  }

  return (
    <Portal>
      {/* Centered title — the blend lives on THIS fixed group so the text
          inverts against the grid images painted behind it. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-40 flex items-center justify-center px-6 [mix-blend-mode:difference] transition-opacity duration-300 ease-out ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2
          className={`max-w-5xl text-center text-5xl font-semibold leading-[0.95] tracking-tight text-[#fffde2] transition-transform duration-500 ease-out sm:text-7xl md:text-8xl ${
            active ? 'translate-y-0' : 'translate-y-4'
          }`}
        >
          {shown?.name}
        </h2>
      </div>

      {/* Right-side details — separate non-blended layer. Anchored to the lower
          right so the vertically-centered title never crosses it (avoiding the
          mix-blend contrast clash); text is kept bright for legibility. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-12 right-6 z-40 hidden w-72 text-right transition-all duration-500 ease-out md:block lg:right-12 ${
          active ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
        }`}
      >
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-300">
          {shown?.tagline} · {shown?.sector}
        </p>
        <ul className="mt-5 space-y-1.5 text-sm font-medium text-white">
          {shown?.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-neutral-300">
          {shown?.description[0]}
        </p>
      </div>
    </Portal>
  );
}
