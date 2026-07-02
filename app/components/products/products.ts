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
    tagline: 'School Management 2.0',
    sector: 'EdTech',
    features: [
      'AI Admin Dashboard',
      'Parent & Teacher Apps',
      'AI Student Insights',
      'Smart Fee Analytics',
    ],
    title:
      "India's AI-Enabled Institute Management Platform for Schools & Colleges",
    description: [
      'School Portal is an AI-enabled educational institute management platform built for Indian schools and colleges — replacing spreadsheet-based systems with one connected dashboard for fees, attendance, compliance, timetables, and communication.',
      'Parents pay fees, check attendance, view homework, and track the bus; teachers mark attendance and post homework and scores; and AI surfaces early-warning signals for at-risk students.',
    ],
    highlights: [
      'AI-assisted admin dashboard for fees, attendance, timetables and communication',
      'Parent and teacher apps for payments, attendance, homework and bus tracking',
      'Board-ready reports in seconds, with UDISE+, AISHE, NAAC and NBA compliance',
      'AI-optimized fee reminders with predictive collection trends',
      'Onboarding within 2 weeks and on-site support within 3 hours',
    ],
    bestFor: [
      'Schools and colleges across India',
      'Principals and administrators',
      'Teachers and parents',
    ],
    thumbnail: POOL[0],
    video: '/assets/Web_design.mp4',
    gallery: galleryFor(0),
  },
  {
    id: 2,
    slug: 'smartbiz',
    name: 'SmartBiz',
    tagline: 'Wholesale Management',
    sector: 'Wholesale & Retail',
    features: [
      'Order Management',
      'GST Invoicing',
      'Inventory Management',
      'Retailer Mobile App',
    ],
    title: 'Wholesale Order Management Platform for Distributors and Their Retailers',
    description: [
      'SmartBiz is a wholesale management platform that lets wholesalers manage retailer orders while retailers place, track, and manage purchases 24/7 from a mobile app — standardizing your business with accuracy.',
      'Wholesalers accept and dispatch orders, print delivery notes, and track stock and profit-loss, while retailers order anytime to keep sales flowing.',
    ],
    highlights: [
      'Retailers order anytime from a free Android app on Google Play',
      'Accept, dispatch and print delivery notes from one admin panel',
      'Built-in GST invoicing, inventory and sales & profit-loss reports',
      'Product notifications to alert retailers about new offerings',
      'Encrypted transactions with anti-spam and anti-hack protection',
    ],
    bestFor: [
      'Wholesalers and distributors',
      'Retailers placing recurring orders',
      'FMCG and trading businesses',
    ],
    thumbnail: POOL[3],
    video: '/assets/branding.mp4',
    gallery: galleryFor(3),
  },
  {
    id: 3,
    slug: 'college-portal',
    name: 'College Portal',
    tagline: 'Higher Education Management',
    sector: 'EdTech',
    features: [
      'Online Admissions',
      'Fee Management',
      'Hostel & Mess',
      'Scholarships & Reports',
    ],
    title:
      'College Administration Platform — from Admissions to Graduation',
    description: [
      'College Portal streamlines college administration with online admissions, student management, fee management, and dynamic reporting — streamlined, secure, and efficient.',
      'It covers the full journey from admissions to graduation, including hostel and mess integration, scholarships and concessions, and role-based dashboards.',
    ],
    highlights: [
      'Online admissions with automated fee allocation and secure payment gateways',
      'Student management with bulk import, single-click promotions and role-based access',
      'Fee structures, automated reminders, late-fee handling and receipts',
      'Hostel and mess allocation, scholarships, and customizable reporting dashboards',
      'Enterprise security: WAF, DDoS protection, 2FA and daily 3x-replicated backups',
    ],
    bestFor: [
      'Colleges and universities',
      'Multi-department institutions',
      'Administrators and accounts teams',
    ],
    thumbnail: POOL[7],
    video: '/assets/motion_graphics.mp4',
    gallery: galleryFor(7),
  },
  {
    id: 4,
    slug: 'sms-portal',
    name: 'SMS Portal',
    tagline: 'Bulk SMS Platform',
    sector: 'Marketing Tech',
    features: [
      'Promotional SMS',
      'Transactional SMS',
      'Campaign Scheduling',
      'Real-time Analytics',
    ],
    title: 'Comprehensive Bulk SMS Platform for Marketing and Transactional Messaging',
    description: [
      'SMS Portal is a comprehensive bulk SMS platform that sends large volumes of messages to recipient groups at once — DLT-compliant, with promotional, transactional, and service message categories.',
      'Direct telecom partnerships and optimized gateways drive high delivery speeds and rates, with real-time reporting on every send.',
    ],
    highlights: [
      'Promotional, transactional and service SMS with a custom 6-character Sender ID',
      'Immediate or scheduled campaigns to managed, DLT-compliant recipient lists',
      'Real-time delivery status and click analytics',
      'Direct telecom partnerships for high delivery rates, no setup cost on transactional routes',
      'Running since 2018, with 24/7 customer support',
    ],
    bestFor: [
      'Marketing and growth teams',
      'Businesses sending OTPs and transactional alerts',
      'Agencies running campaigns for multiple clients',
    ],
    thumbnail: POOL[11],
    video: '/assets/mobile_application.mp4',
    gallery: galleryFor(11),
  },
];
