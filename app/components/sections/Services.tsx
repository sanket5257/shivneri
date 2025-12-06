'use client'

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  description?: string;
  videoSrc: string;
}

const ServicesSection = () => {
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const services: Service[] = [
    // First row - 2 services
    {
      id: 1,
      title: 'Product Design',
      description: 'We craft digital products that solve real problems and delight users from concept to launch.',
      videoSrc: '/assets/branding.mp4'
    },
    {
      id: 2,
      title: 'UX/UI Design',
      description: 'We create visually stunning, user-friendly designs that enhance engagement and deliver a smooth digital experience.',
      videoSrc: '/assets/Web_design.mp4'
    },
    // Second row - 3 services
    {
      id: 3,
      title: 'Mobile Applications',
      description: 'We craft intuitive, high-performance mobile applications that delight users and accelerate growth.',
      videoSrc: '/assets/mobile_application.mp4'
    },
    {
      id: 4,
      title: 'Development',
      description: 'We build robust technical foundations that bring creative concepts to life while ensuring scalability for your growing business.',
      videoSrc: '/assets/development.mp4'
    },
    {
      id: 5,
      title: 'Video Editing',
      description: 'We turn raw footage into captivating stories that elevate your brand everywhere.',
      videoSrc: '/assets/video_editing.mp4'
    },
    // Third row - 2 services
    {
      id: 6,
      title: 'Graphic Design & Branding',
      description: 'We translate your values into distinctive visual identities that resonate with audiences and create immediate recognition.',
      videoSrc: '/assets/branding.mp4'
    },
    {
      id: 7,
      title: 'Motion Design',
      description: 'We bring visuals to life with dynamic animation that clarifies, excites, and moves audiences.',
      videoSrc: '/assets/motion_graphics.mp4'
    },
  ];

  useEffect(() => {
    // Header animation
    const headerTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    if (headerRef.current && subtitleRef.current && title1Ref.current && title2Ref.current && ctaRef.current) {
      // Set initial styles
      gsap.set([headerRef.current, subtitleRef.current, title1Ref.current, title2Ref.current, ctaRef.current], {
        opacity: 0,
        y: 20
      });

      // Animate header elements in sequence
      headerTl
        .to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3
        })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6
        }, '-=0.5')
        .to(title1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.6
        }, '-=0.4')
        .to(title2Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.6
        }, '-=0.3')
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6
        }, '-=0.2');
    }

    // Service cards animation
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseEnter = async (index: number) => {
    if (!services[index].videoSrc) return;
    
    const videoElement = videoRefs.current[index]?.querySelector('video');
    if (!videoElement) return;

    try {
      setPlayingIndex(index);
      videoElement.currentTime = 0;
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        await playPromise.catch(() => {
          // Handle the error silently
          setPlayingIndex(null);
        });
      }
    } catch (err) {
      console.error('Error playing video:', err);
      setPlayingIndex(null);
    }
  };

  const handleMouseLeave = (index: number) => {
    if (playingIndex !== index) return;
    
    const videoElement = videoRefs.current[index]?.querySelector('video');
    if (videoElement) {
      try {
        videoElement.pause();
        videoElement.currentTime = 0;
      } catch (err) {
        console.error('Error pausing video:', err);
      }
    }
    setPlayingIndex(null);
  };

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <img 
          className='absolute -z-10 top-0 -right-40 sm:-right-60 md:-right-80 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] contrast-125' 
          src="/assets/images/68e3caaa1e0d3deccf973f65_67867867.svg" 
          alt="" 
        />
        <div ref={headerRef} className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 z-50">
          <div ref={subtitleRef} className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 border border-neutral-700 rounded-full text-xs sm:text-sm text-neutral-400 mb-4 sm:mb-6 md:mb-8">
            Services
          </div>
          <h1 ref={title1Ref} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-3 sm:mb-4">
            <span className="text-neutral-500">It's not just what we build</span>
          </h1>
          <h1 ref={title2Ref} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight">
            <span>it'z how we show up.</span>
          </h1>
          <div ref={ctaRef} className="flex justify-end mt-6 sm:mt-8">
            <Link href="/services" className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border border-neutral-700 rounded-full hover:border-neutral-500 transition-colors text-sm sm:text-base">
              <span className="text-neutral-400">Learn more</span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-neutral-700 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-neutral-400 w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>


        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-0">
          {services.map((service, index) => (
            <div key={service.id} className={`relative group ${
              // First row: 2 items, each spans 3 columns on medium screens and up
              index < 2 ? 'sm:col-span-1 lg:col-span-3' : 
              // Second row: 3 items, each spans 2 columns on large screens and up
              index < 5 ? 'sm:col-span-1 lg:col-span-2' :
              // Third row: 2 items, each spans 3 columns on large screens and up
              'sm:col-span-1 lg:col-span-3'
            }`}>
              <svg 
                className="absolute top-3 sm:top-4 left-2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 opacity-80 group-hover:opacity-100 transition-all duration-300 z-10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  className="stroke-white group-hover:fill-white transition-colors duration-300"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              <article 
                className="h-[300px] sm:h-[350px] md:h-[400px] bg-black/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 transition-all duration-500 hover:bg-black/80 border border-white/30 relative overflow-hidden group cursor-pointer flex flex-col"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => {
                  // Toggle video on mobile tap
                  if (window.innerWidth < 768) {
                    if (playingIndex === index) {
                      handleMouseLeave(index);
                    } else {
                      handleMouseEnter(index);
                    }
                  }
                }}
              >
                {service.videoSrc && (
                  <div 
                    ref={el => { videoRefs.current[index] = el; }}
                    className={`absolute inset-0 w-full h-full ${
                      playingIndex === index ? 'opacity-100' : 'opacity-0'
                    } md:group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    <video 
                      className="w-full h-full object-cover" 
                      loop 
                      muted
                      playsInline
                      preload="none"
                    >
                      <source src={service.videoSrc} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80" />
                  </div>
                )}
                
                <div className="flex-1"></div> {/* This pushes the content to the bottom */}
                
                <div className="relative z-10 mt-auto">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">{service.title}</h3>
                  <div className="overflow-hidden">
                    <p className="text-gray-300/80 text-base sm:text-lg md:text-xl leading-relaxed transition-all duration-300 transform md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      {service.description}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default ServicesSection;