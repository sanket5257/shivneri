import type { Project } from './types';

/**
 * "Index of Work" data — layout modelled on the harrygeorge.design/work index.
 *
 * NOTE: the projects, copy and imagery below are PLACEHOLDERS (generic samples +
 * shared photos). Swap in Shivneri's real case studies and assets — do not ship
 * sample content to production.
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

export const projects: Project[] = [
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
