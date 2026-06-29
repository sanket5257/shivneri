import type { Product } from './types';

/**
 * Products index data — Shivneri's real products mapped into the gallery layout.
 *
 * NOTE: imagery is a PLACEHOLDER (shared photos from /public/assets/images/work)
 * — swap in real per-product screenshots when available.
 */
const POOL = [
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

// Build a slideshow of `count` frames starting at `offset`, wrapping the pool.
const galleryFor = (offset: number, count = 4): string[] =>
  Array.from({ length: count }, (_, k) => POOL[(offset + k) % POOL.length]);

export const products: Product[] = [
  {
    id: 1,
    slug: 'school-portal',
    name: 'School Portal',
    tagline: 'Education Management',
    sector: 'EdTech',
    features: [
      'Student Management',
      'Attendance Tracking',
      'Grade Management',
      'Parent Portal',
    ],
    title:
      'Comprehensive School Management System for Modern Educational Institutions',
    description: [
      'Streamline student enrollment, attendance tracking, grade management, and parent communication with our intuitive platform designed for K-12 schools.',
      'Built to give administrators, teachers and parents a single source of truth for every student.',
    ],
    thumbnail: POOL[0],
    video: '/assets/Web_design.mp4',
    gallery: galleryFor(0),
  },
  {
    id: 2,
    slug: 'smartbiz',
    name: 'SmartBiz',
    tagline: 'Business Solutions',
    sector: 'SaaS',
    features: [
      'Inventory Control',
      'CRM Integration',
      'Financial Reports',
      'Team Collaboration',
    ],
    title: 'All-in-One Business Management Platform to Scale Your Operations',
    description: [
      'From inventory management to customer relations, SmartBiz provides the tools you need to run your business efficiently and grow with confidence.',
      'One connected workspace so your team spends less time switching tools and more time moving the business forward.',
    ],
    thumbnail: POOL[3],
    video: '/assets/branding.mp4',
    gallery: galleryFor(3),
  },
  {
    id: 3,
    slug: 'college-portal',
    name: 'College Portal',
    tagline: 'Higher Education',
    sector: 'EdTech',
    features: [
      'Course Management',
      'Faculty Portal',
      'Admissions System',
      'Student Services',
    ],
    title:
      'Advanced Portal for Higher Education Management and Student Services',
    description: [
      'Manage courses, faculty, admissions, and student services with a robust platform built specifically for colleges and universities.',
      'Scales from a single department to an entire campus without losing the details that matter.',
    ],
    thumbnail: POOL[7],
    video: '/assets/motion_graphics.mp4',
    gallery: galleryFor(7),
  },
  {
    id: 4,
    slug: 'sms-portal',
    name: 'SMS Portal',
    tagline: 'Communication',
    sector: 'Marketing Tech',
    features: [
      'Bulk Messaging',
      'Campaign Management',
      'Analytics Dashboard',
      'API Integration',
    ],
    title: 'Robust SMS Platform for Customer Engagement at Scale',
    description: [
      'Connect with your customers through powerful text messaging campaigns, automated workflows, and real-time analytics.',
      'Reach the right audience at the right moment, then measure every send with clear, actionable analytics.',
    ],
    thumbnail: POOL[11],
    video: '/assets/mobile_application.mp4',
    gallery: galleryFor(11),
  },
];
