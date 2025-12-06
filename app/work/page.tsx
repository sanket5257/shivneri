'use client'

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Filter {
  id: string;
  label: string;
}

interface Project {
  id: number;
  title: string;
  video: string;
  thumbnail: string;
  url: string;
  tags: string[];
  category: string;
}

const WorkSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const filters: Filter[] = [
    { id: 'all', label: 'All' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'food', label: 'Food' },
    { id: 'education', label: 'Education' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'nonprofit', label: 'Nonprofit' },
    { id: 'financial', label: 'Financial' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'HerrBebe',
      video: '/assets/Web_design.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      url: 'https://example.com/herrbebe',
      tags: ['UX/UI Design', 'Development'],
      category: 'ecommerce'
    },
    {
      id: 2,
      title: 'Ikigai',
      video: '/assets/Web_design.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      url: 'https://example.com/ikigai',
      tags: ['UX/UI Design'],
      category: 'food'
    },
    {
      id: 3,
      title: 'My Intellect',
      video: '/assets/Web_design.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      url: 'https://example.com/myintellect',
      tags: ['Mobile App', 'UX/UI Design', 'Development'],
      category: 'education'
    },
    {
      id: 4,
      title: 'eDrogeria',
      video: '/assets/Web_design.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      url: 'https://example.com/edrogeria',
      tags: ['UX/UI Design', 'Development'],
      category: 'ecommerce'
    },
    {
      id: 5,
      title: 'StreamVibe',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99790-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80',
      url: 'https://example.com/streamvibe',
      tags: ['Web Design', 'Development'],
      category: 'entertainment'
    },
    {
      id: 6,
      title: 'FitTrack Pro',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-young-people-using-their-smartphones-in-a-library-4917-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
      url: 'https://example.com/fittrack',
      tags: ['Mobile App', 'UX/UI Design'],
      category: 'health'
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleCardHover = (index: number, isHovering: boolean) => {
    setHoveredCard(isHovering ? index : null);
    const video = videoRefs.current[index];
    
    if (video) {
      if (isHovering) {
        video.currentTime = 0;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Video play prevented:', error);
          });
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const getGridClass = (idx: number): string => {
    const patterns = [
      'md:col-span-7 md:row-span-1',
      'md:col-span-5 md:row-span-1',
      'md:col-span-5 md:row-span-1',
      'md:col-span-7 md:row-span-1',
      'md:col-span-6 md:row-span-1',
      'md:col-span-6 md:row-span-1',
    ];
    return patterns[idx % patterns.length];
  };

  return (
    <div className="relative min-h-screen bg-black text-white py-40 px-6 overflow-hidden">
     

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto" ref={sectionRef}>
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-b from-white via-neutral-300 to-neutral-600 bg-clip-text text-transparent">
              Where stories
            </span>
            <br />
            <span className="bg-gradient-to-b from-white via-neutral-300 to-neutral-600 bg-clip-text text-transparent">
              become experience
            </span>
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-white text-black'
                  : 'bg-zinc-900/80 backdrop-blur-sm text-neutral-400 hover:bg-zinc-800/80 hover:text-white border border-zinc-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => {
                handleMouseLeave(index);
                handleCardHover(index, false);
              }}
              onClick={() => handleCardClick(project.url)}
              style={{ transformStyle: 'preserve-3d' }}
              className={`group relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-900 cursor-pointer ${getGridClass(index)}`}
            >
              {/* Video/Image Container */}
              <div className="relative w-full h-full overflow-hidden">
                {/* Thumbnail Image */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    hoveredCard === index ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}
                />
                
                {/* Video */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Hover Border Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold mb-4 transform transition-transform duration-300 group-hover:translate-x-2">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-8 right-8 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 border border-white/20">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>

              {/* Minimal Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkSection;