'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const BookingModal = dynamic(() => import('../BookingModal'), { ssr: false });
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState('');
  const [menuHover, setMenuHover] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navItems = [
    { id: 'about', label: 'About', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'work', label: 'Work', path: '/work' },
    { id: 'how-we-work', label: 'How We Work', path: '/how-we-work' },
    { id: 'products', label: 'Products', path: '/products' },
  ];

  // Live clock (IST) like Ecrin's location/time status
  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close the expanded menu when clicking outside of it
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Liquid-glass refraction source.
          Apple's "Liquid Glass" bends light hard at the EDGES (a thick glass
          lens) while the centre stays clear. We drive feDisplacementMap with a
          bevel "normal map" instead of turbulence: R encodes horizontal slope,
          G vertical slope, both neutral (128) in the middle and ramping to the
          extremes only near the rim — so the backdrop magnifies at the edges
          and is left untouched in the centre. */}
      <svg
        aria-hidden
        width="0"
        height="0"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        <filter
          id="liquid-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={`data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>` +
                `<defs>` +
                `<linearGradient id='x' x1='0' y1='0' x2='1' y2='0'>` +
                `<stop offset='0' stop-color='rgb(0,0,0)'/>` +
                `<stop offset='0.16' stop-color='rgb(128,0,0)'/>` +
                `<stop offset='0.84' stop-color='rgb(128,0,0)'/>` +
                `<stop offset='1' stop-color='rgb(255,0,0)'/>` +
                `</linearGradient>` +
                `<linearGradient id='y' x1='0' y1='0' x2='0' y2='1'>` +
                `<stop offset='0' stop-color='rgb(0,0,0)'/>` +
                `<stop offset='0.16' stop-color='rgb(0,128,0)'/>` +
                `<stop offset='0.84' stop-color='rgb(0,128,0)'/>` +
                `<stop offset='1' stop-color='rgb(0,255,0)'/>` +
                `</linearGradient>` +
                `</defs>` +
                `<rect width='100' height='100' fill='url(#x)'/>` +
                `<rect width='100' height='100' fill='url(#y)' style='mix-blend-mode:screen'/>` +
                `</svg>`
            )}`}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="map"
          />
          {/* slightly different scales per channel = faint chromatic fringe
              at the rim, like real glass */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="54"
            xChannelSelector="R"
            yChannelSelector="G"
            result="disp"
          />
          <feGaussianBlur in="disp" stdDeviation="0.4" />
        </filter>
      </svg>

      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 lg:px-24 py-6 md:py-8">
        <nav className="mx-auto flex items-start justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            className="z-50 flex items-center pt-3"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="../assets/images/logo2.png"
              alt="Shivneri Systems"
              className="h-7 sm:h-8 w-auto"
            />
          </Link>

          {/* Center: expanding Menu panel — Apple "Liquid Glass" */}
          <div
            ref={menuRef}
            className={`liquid-glass ${
              isOpen ? 'liquid-glass--raised' : ''
            } absolute left-1/2 -translate-x-1/2 z-50 w-64 sm:w-80 md:w-96 rounded-2xl`}
            style={{
              maxHeight: isOpen ? 420 : 60,
              transition:
                'max-height 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* Toggle row */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              onMouseEnter={() => setMenuHover(true)}
              onMouseLeave={() => setMenuHover(false)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="relative z-20 flex w-full cursor-pointer items-center justify-between px-6 text-white"
              style={{ height: 60 }}
            >
              <span
                className="text-sm font-light tracking-wide transition-opacity duration-300"
                style={{ opacity: menuHover && !isOpen ? 0.8 : 1 }}
              >
                {isOpen ? 'Close' : 'Menu'}
              </span>
              <span
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: 6,
                  width: 24,
                  height: 9,
                }}
              >
                {/* Top line */}
                <span
                  style={{
                    height: 1.5,
                    borderRadius: 9999,
                    background: '#fff',
                    width: isOpen ? '100%' : menuHover ? '55%' : '100%',
                    transformOrigin: 'center',
                    transform: isOpen
                      ? 'translateY(3.75px) rotate(45deg)'
                      : 'none',
                    transition:
                      'width 0.45s cubic-bezier(0.76, 0, 0.24, 1), transform 0.45s cubic-bezier(0.76, 0, 0.24, 1)',
                  }}
                />
                {/* Bottom line */}
                <span
                  style={{
                    height: 1.5,
                    borderRadius: 9999,
                    background: '#fff',
                    width: isOpen ? '100%' : menuHover ? '100%' : '55%',
                    transformOrigin: 'center',
                    transform: isOpen
                      ? 'translateY(-3.75px) rotate(-45deg)'
                      : 'none',
                    transition:
                      'width 0.45s cubic-bezier(0.76, 0, 0.24, 1) 0.06s, transform 0.45s cubic-bezier(0.76, 0, 0.24, 1)',
                  }}
                />
              </span>
            </button>

            {/* Expanding content */}
            <div className="relative z-20 px-6 pb-6">
              <nav className="flex flex-col">
                {navItems.map((item, index) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-baseline gap-2 py-1 uppercase tracking-tight transition-colors duration-300 ${
                      pathname === item.path
                        ? 'text-orange-400'
                        : 'text-white hover:text-orange-400'
                    }`}
                  >
                    <span className="text-2xl font-medium">{item.label}</span>
                    <span className="text-xs font-light text-white/40 transition-colors duration-300 group-hover:text-orange-400">
                      ({index + 1})
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Status line */}
              <div className="mt-5 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-xs text-neutral-400">
                <span>Ichalkaranji, India</span>
                <span>·</span>
                <time>{time}</time>
                <span>·</span>
                <span>IST</span>
              </div>
            </div>
          </div>

          {/* Right: Book a meeting */}
          <div className="z-50 flex items-center space-x-3 sm:space-x-4 pt-2">
            <button
              className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
            >
              Book a meeting
            </button>
          </div>
        </nav>
      </header>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
