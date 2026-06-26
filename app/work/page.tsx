'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  tags: string[];
  description: string;
  collaboration?: string;
  gallery: string[];
}

/**
 * "Index of Work" — layout modelled on the harrygeorge.design/work index.
 *
 * NOTE: the projects, copy and imagery below are PLACEHOLDERS (generic samples +
 * Unsplash photos). Swap in Shivneri's real case studies and assets — do not
 * ship sample content to production.
 */
// Gallery imagery — served entirely from /public/assets/images/work. Each
// project pulls a rotated slice of the shared pool so every marquee has enough
// frames to scroll seamlessly. Swap in real per-project assets when available.
const GALLERY_POOL = [
  '/assets/images/work/69826a5f2c5673280267bc6b_index-listing_raidiam_004.webp',
  '/assets/images/work/69826a5fa05d4cc3d7b16b9d_index-listing_raidiam_005.webp',
  '/assets/images/work/69826a5f1a3c2612a19401db_index-listing_raidiam_006.webp',
  '/assets/images/work/6985308b60e7953565164ed4_index-listing_friendmts_001.webp',
  '/assets/images/work/6985308b91fb9326e05e207c_index-listing_friendmts_002.webp',
  '/assets/images/work/6985308b6910b13970ab8814_index-listing_friendmts_005.webp',
  '/assets/images/work/6985308b40a876ccff082664_index-listing_friendmts_007.webp',
  '/assets/images/work/69834444e0f81205ed5c9517_index-listing_tcm_001.webp',
  '/assets/images/work/69834444c27db26bbea632fc_index-listing_tcm_002.webp',
  '/assets/images/work/69834444e4e3117ba169eeec_index-listing_tcm_003.webp',
  '/assets/images/work/69834444871e181f135a930e_index-listing_tcm_004.webp',
  '/assets/images/work/69853330fa367f04965f0897_fae1556e5e7f7a3fc2deaa81ac7bd194_index-listing_hitachi_001.webp',
  '/assets/images/work/698533308dfb0f7900872a18_2ed58d9cc5d56fe631db21086aa58f01_index-listing_hitachi_002.webp',
  '/assets/images/work/69853330ae0073900d288728_c0b50fbcfffb57b59ee116be1875e92a_index-listing_hitachi_003.webp',
  '/assets/images/work/698533301a7b4067f7946aaf_effb88e593e42ae103bdfa44e5fb24cd_index-listing_hitachi_004.webp',
];

const galleryFor = (offset: number): string[] =>
  Array.from(
    { length: 6 },
    (_, k) => GALLERY_POOL[(offset * 3 + k) % GALLERY_POOL.length]
  );

const projects: Project[] = [
  {
    id: 1,
    title: 'Nimbus Cloud',
    tags: ['Product Design', 'UX/UI Design', 'Development', 'Design System'],
    description:
      'Nimbus needed a developer platform that feels as fast as it runs. We rebuilt the marketing site and console around a cloud-native design system — with motion, live docs, and an onboarding flow engineers actually finish.',
    collaboration: 'SHIVNERI / STUDIO',
    gallery: galleryFor(0),
  },
  {
    id: 2,
    title: 'FinEdge',
    tags: ['UX/UI Design', 'Brand Evolution', 'Development'],
    description:
      'FinEdge turns messy financial data into clarity. We designed a dashboard and refreshed the brand so complex portfolios become understandable at a glance — fast to read, faster to act on.',
    collaboration: 'SHIVNERI / STUDIO',
    gallery: galleryFor(1),
  },
  {
    id: 3,
    title: 'MediSync',
    tags: ['Mobile App', 'UX/UI Design', 'Accessibility'],
    description:
      'MediSync connects clinics and patients in real time. We shipped a mobile app and component library built for trust, speed and accessibility — from first appointment to follow-up.',
    collaboration: 'SHIVNERI / STUDIO',
    gallery: galleryFor(2),
  },
  {
    id: 4,
    title: 'Orbit Commerce',
    tags: ['Web Design', 'Development', 'Brand Evolution'],
    description:
      'Orbit sells globally. We rebuilt the storefront for international expansion — modular, multi-language, and simple to maintain — while keeping checkout fast on every device.',
    collaboration: 'SHIVNERI / STUDIO',
    gallery: galleryFor(3),
  },
  {
    id: 5,
    title: 'EduSpark',
    tags: ['Product Design', 'UX/UI Design', 'Development'],
    description:
      'EduSpark makes learning stick. We created a platform and content system that scales across courses, cohorts and campaigns — for learners on the move and teams behind the scenes.',
    collaboration: 'SHIVNERI / STUDIO',
    gallery: galleryFor(4),
  },
];

export default function WorkPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = (window as unknown as { lenis?: { on: Function; off: Function } })
      .lenis;
    const onScroll = () => ScrollTrigger.update();
    if (lenis) lenis.on('scroll', onScroll);

    let ctx: ReturnType<typeof gsap.context> | undefined;

    // Build reveals after layout/images settle so soft-navigation never leaves
    // rows stuck invisible (same hardening used elsewhere in the app).
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        ctx = gsap.context(() => {
          // Row reveal on scroll
          gsap.utils.toArray<HTMLElement>('.work-row').forEach((row) => {
            gsap.fromTo(
              row,
              { opacity: 0, y: 48 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 82%',
                  once: true,
                  invalidateOnRefresh: true,
                },
              }
            );
          });

          // Gallery marquees — each track holds two identical image sets, so
          // an xPercent shift of one set wraps seamlessly. Alternate rows run
          // the opposite direction. Pause on hover.
          const cleanups: Array<() => void> = [];
          marqueeRefs.current.forEach((track, i) => {
            if (!track || reduceMotion) return;
            const reverse = i % 2 === 1;
            const tween = gsap.fromTo(
              track,
              { xPercent: reverse ? -50 : 0 },
              {
                xPercent: reverse ? 0 : -50,
                duration: 55,
                ease: 'none',
                repeat: -1,
              }
            );
            const pause = () => tween.pause();
            const play = () => tween.play();
            track.addEventListener('mouseenter', pause);
            track.addEventListener('mouseleave', play);
            cleanups.push(() => {
              track.removeEventListener('mouseenter', pause);
              track.removeEventListener('mouseleave', play);
            });
          });

          return () => cleanups.forEach((fn) => fn());
        }, rootRef);

        ScrollTrigger.refresh();
      })
    );

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      if (lenis) lenis.off('scroll', onScroll);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-[#121212] text-[#f1f1f1]">
      <div className="mx-auto max-w-[1728px] px-6 md:px-12 lg:px-24 pt-32 sm:pt-40 pb-28 md:pb-40">
        {/* Page header */}
        <header className="mb-16 md:mb-24">
          <p className="text-sm font-medium text-neutral-400 mb-3">Work</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
            Index of Work
          </h1>
        </header>

        {/* Project index */}
        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, projectIndex) => (
            <article
              key={project.id}
              className="work-row border-t border-white/10 pt-8 md:pt-10"
            >
              {/* Title row */}
              <div className="flex items-start justify-between gap-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                  {project.title}
                </h2>
              </div>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs sm:text-sm text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description + collaboration */}
              <div className="mt-6 max-w-md">
                <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
                  {project.description}
                </p>
                {project.collaboration && (
                  <p className="mt-5 text-xs text-neutral-500">
                    In collaboration with
                    <br />
                    <span className="tracking-[0.18em] text-neutral-400">
                      {project.collaboration}
                    </span>
                  </p>
                )}
              </div>

              {/* Full-bleed auto-scrolling gallery marquee (GSAP-driven) */}
              <div className="mt-8 -mx-6 overflow-hidden md:-mx-12 lg:-mx-24">
                <div
                  ref={(el) => {
                    marqueeRefs.current[projectIndex] = el;
                  }}
                  className="flex w-max"
                >
                  {[...project.gallery, ...project.gallery].map((src, i) => (
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
