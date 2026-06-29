import type { Ref } from 'react';

interface GalleryMarqueeProps {
  gallery: string[];
  /** Ref callback wiring the track into the page's GSAP marquee tween. */
  trackRef: Ref<HTMLDivElement>;
}

/**
 * Full-bleed auto-scrolling gallery marquee. The track holds two identical
 * image sets so a -50% xPercent shift wraps seamlessly; motion itself is driven
 * by GSAP from `useWorkAnimations` via `trackRef`.
 */
export default function GalleryMarquee({
  gallery,
  trackRef,
}: GalleryMarqueeProps) {
  return (
    <div className="mt-8 -mx-6 overflow-hidden md:-mx-12 lg:-mx-24">
      <div ref={trackRef} className="flex w-max">
        {[...gallery, ...gallery].map((src, i) => (
          <div
            key={i}
            className="group relative aspect-[3/2] h-[220px] shrink-0 mr-3 overflow-hidden bg-neutral-900 sm:h-[280px] md:h-[360px]"
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              draggable={false}
              loading="lazy"
              className="h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
