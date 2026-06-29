'use client';

import { useState } from 'react';
import type { Product } from './types';
import ProductGridItem from './ProductGridItem';
import ProductHoverPreview from './ProductHoverPreview';

interface ProductGridProps {
  products: Product[];
  onOpen: (product: Product) => void;
}

/**
 * Two-column staggered grid. Products alternate between the left and right
 * columns; the right column is pushed down so the two never line up — an offset
 * masonry look. Hovering any card raises the page-level hover preview. Collapses
 * to one column on small screens.
 */
export default function ProductGrid({ products, onOpen }: ProductGridProps) {
  const [hovered, setHovered] = useState<Product | null>(null);

  const left = products.filter((_, i) => i % 2 === 0);
  const right = products.filter((_, i) => i % 2 === 1);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-y-24">
        <div className="flex flex-col gap-16 md:gap-24">
          {left.map((product) => (
            <div key={product.id} className="product-card">
              <ProductGridItem
                product={product}
                onOpen={onOpen}
                onHover={setHovered}
                dimmed={hovered !== null && hovered.id !== product.id}
              />
            </div>
          ))}
        </div>
        {/* Right column offset down for the staggered rhythm */}
        <div className="flex flex-col gap-16 md:mt-[14vh] md:gap-24">
          {right.map((product) => (
            <div key={product.id} className="product-card">
              <ProductGridItem
                product={product}
                onOpen={onOpen}
                onHover={setHovered}
                dimmed={hovered !== null && hovered.id !== product.id}
              />
            </div>
          ))}
        </div>
      </div>

      <ProductHoverPreview product={hovered} />
    </>
  );
}
