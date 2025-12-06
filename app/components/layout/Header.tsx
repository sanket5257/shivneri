'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const BookingModal = dynamic(() => import('../BookingModal'), { ssr: false });
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navItems = [
    { id: 'services', label: 'Services +', path: '/services' },
    { id: 'work', label: 'Work +', path: '/work' },
    { id: 'how-we-work', label: 'How We Work', path: '/how-we-work' },
    { id: 'customer-stories', label: 'Customer Stories', path: '/customer-stories' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'about', label: 'About', path: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 backdrop-blur-xl transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center z-50">
            <img 
              src="../assets/images/logo2.png" 
              alt="Shivneri Systems" 
              className="h-7 sm:h-8 w-auto transition-all duration-300" 
              width={scrolled ? 100 : 120}
              height={scrolled ? 28 : 32}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div 
            ref={navRef}
            className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 text-sm"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  href={item.path}
                  className={`transition-all duration-300 ${
                    hoveredItem && hoveredItem !== item.id 
                      ? 'opacity-40 hover:opacity-100' 
                      : 'opacity-100'
                  } text-white hover:text-orange-400 cursor-pointer text-sm lg:text-sm`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                <div className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 ${pathname === item.path ? 'w-full' : 'group-hover:w-full'}`}></div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
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

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-white z-50 p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="h-full overflow-y-auto pt-24 pb-8 px-6">
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link 
                  key={item.id}
                  href={item.path}
                  className={`text-2xl font-light py-3 border-b border-gray-800 hover:text-orange-400 transition-colors duration-200 ${
                    pathname === item.path ? 'text-orange-400' : 'text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-8 flex flex-col space-y-4">
                <button 
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-white text-lg font-medium"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsOpen(false);
                  }}
                >
                  Book a meeting
                </button>
                
                <div className="flex justify-center space-x-6 pt-8">
                  <a href="mailto:contact@shivneri.com" className="text-gray-400 hover:text-white transition-colors">
                    <MdEmail size={24} />
                  </a>
                  <a href="tel:+911234567890" className="text-gray-400 hover:text-white transition-colors">
                    <MdPhone size={24} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
