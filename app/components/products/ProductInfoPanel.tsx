'use client';

import type { Product } from './types';

interface ProductInfoPanelProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

/**
 * Sliding "Product information" panel inside the detail overlay. Holds the
 * headline, features, sector and description. Slides in from the right and is
 * dismissed with its own close control or the overlay's "Details" toggle.
 */
export default function ProductInfoPanel({
  product,
  open,
  onClose,
}: ProductInfoPanelProps) {
  return (
    <aside
      aria-label="Product information"
      aria-hidden={!open}
      className={`absolute right-0 top-0 z-40 h-full w-full max-w-md overflow-y-auto bg-black/90 px-6 py-20 text-white backdrop-blur-md transition-transform duration-500 ease-out sm:px-10 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close product info"
        className="liquid-glass absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="relative z-[2] h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
        {product.tagline}
      </p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
        {product.name}
      </h2>

      <p className="mt-6 text-base leading-snug text-neutral-200">
        {product.title}
      </p>

      <dl className="mt-10 space-y-8 text-sm">
        <div>
          <dt className="mb-2 text-xs uppercase tracking-[0.18em] text-white/40">
            Features
          </dt>
          <ul className="space-y-1 text-neutral-200">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <div>
          <dt className="mb-2 text-xs uppercase tracking-[0.18em] text-white/40">
            Sector
          </dt>
          <dd className="text-neutral-200">{product.sector}</dd>
        </div>
      </dl>

      <div className="mt-10 space-y-4 text-sm leading-relaxed text-neutral-300">
        {product.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="mb-3 text-xs uppercase tracking-[0.18em] text-white/40">
          Highlights
        </h3>
        <ul className="space-y-2 text-sm text-neutral-200">
          {product.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/50"
              />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="mb-3 text-xs uppercase tracking-[0.18em] text-white/40">
          Best for
        </h3>
        <ul className="flex flex-wrap gap-2">
          {product.bestFor.map((b) => (
            <li
              key={b}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-200"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
