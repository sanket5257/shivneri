import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 – Page Not Found | Shivneri',
  description:
    "The page you're looking for doesn't exist or has moved. Head back home or explore what Shivneri builds.",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white px-6 pt-32 pb-20">
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #ff843c 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* 404 */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-semibold tracking-tight leading-none">
          <span className="text-neutral-600">4</span>
          <span className="text-white">0</span>
          <span className="text-neutral-600">4</span>
        </h1>

        <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-light tracking-tight">
          This page took a wrong turn.
        </h2>

        <p className="mt-4 max-w-md text-sm sm:text-base text-neutral-400 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or never
          made it past the drawing board. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="btn-primary w-full sm:w-auto px-6 py-3 text-sm sm:text-base text-center"
          >
            Back to home
          </Link>
          <Link
            href="/services"
            className="group w-full sm:w-auto px-6 py-3 border border-neutral-700 rounded-lg hover:border-neutral-500 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <span className="relative z-10">Explore our services</span>
            <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Quick links */}
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-neutral-500">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/work" className="hover:text-white transition-colors">Work</Link>
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <Link href="/how-we-work" className="hover:text-white transition-colors">How We Work</Link>
        </nav>
      </div>
    </main>
  );
}
