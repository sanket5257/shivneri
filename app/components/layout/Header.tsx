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
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navItems = [
    { id: 'about', label: 'About', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'work', label: 'Work', path: '/work' },
    { id: 'how-we-work', label: 'How We Work', path: '/how-we-work' },
    { id: 'customer-stories', label: 'Customer Stories', path: '/customer-stories' },
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

          {/* Center: expanding Menu panel (matches Ecrin .menu-panel) */}
          <div
            ref={menuRef}
            className="absolute left-1/2 -translate-x-1/2 z-50 w-64 sm:w-80 md:w-96 overflow-hidden rounded-2xl"
            style={{
              maxHeight: isOpen ? 420 : 60,
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: isOpen
                ? 'inset 0 1px 0 0 rgba(255,255,255,0.18), 0 24px 60px -12px rgba(0,0,0,0.7)'
                : 'inset 0 1px 0 0 rgba(255,255,255,0.14), 0 12px 32px -8px rgba(0,0,0,0.5)',
              transition:
                'max-height 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* Toggle row */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="flex w-full items-center justify-between px-6 text-white"
              style={{ height: 60 }}
            >
              <span className="text-sm font-light tracking-wide">
                {isOpen ? 'Close' : 'Menu'}
              </span>
              <span className="relative flex h-2 w-5 flex-col justify-between">
                <span
                  className="block h-px w-full bg-white transition-transform duration-300"
                  style={{ transform: isOpen ? 'translateY(4px) rotate(45deg)' : 'none' }}
                />
                <span
                  className="block h-px w-full bg-white transition-transform duration-300"
                  style={{ transform: isOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }}
                />
              </span>
            </button>

            {/* Expanding content */}
            <div className="px-6 pb-6">
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
