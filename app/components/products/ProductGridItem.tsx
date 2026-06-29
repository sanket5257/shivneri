'use client';

import type { Product } from './types';

interface ProductGridItemProps {
  product: Product;
  onOpen: (product: Product) => void;
  onHover: (product: Product | null) => void;
  /** Dim this card when another card is the one being hovered. */
  dimmed: boolean;
}

/**
 * One product card in the index grid — just the cover image. Hovering (or
 * focusing) it raises the page-level hover preview (centered title + right-side
 * details) and dims every other card; clicking opens the fullscreen detail view.
 */
export default function ProductGridItem({
  product,
  onOpen,
  onHover,
  dimmed,
}: ProductGridItemProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      onMouseEnter={() => onHover(product)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(product)}
      onBlur={() => onHover(null)}
      className="group block w-full cursor-pointer text-left"
      aria-label={`Open ${product.name}`}
    >
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden bg-[#1a1a1a] transition-opacity duration-500 ease-out ${
          dimmed ? 'opacity-30' : 'opacity-100'
        }`}
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          draggable={false}
          loading="lazy"
          className="h-full w-full select-none object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
    </button>
  );
}
