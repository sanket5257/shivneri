'use client';

import { useState } from 'react';
import ProductsHeader from '../components/products/ProductsHeader';
import ProductGrid from '../components/products/ProductGrid';
import ProductDetailOverlay from '../components/products/ProductDetailOverlay';
import { useProductAnimations } from '../components/products/useProductAnimations';
import { products } from '../components/products/products';
import type { Product } from '../components/products/types';

export default function ProductsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { rootRef } = useProductAnimations();

  const open = (product: Product) =>
    setActiveIndex(products.findIndex((p) => p.id === product.id));

  return (
    <div ref={rootRef} className="min-h-screen bg-black text-[#f1f1f1]">
      <div className="mx-auto max-w-[1728px] px-6 pb-28 pt-32 sm:pt-40 md:px-12 md:pb-40 lg:px-24">
        <ProductsHeader />
        <ProductGrid products={products} onOpen={open} />
      </div>

      <ProductDetailOverlay
        products={products}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
