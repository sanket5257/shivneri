'use client'
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OurApproachSection from '../components/sections/OurApproch';
import CTA from '../components/sections/CTA';

gsap.registerPlugin(ScrollTrigger);

export default function UXUIShowcase() {
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    // Clear any existing ScrollTrigger instances to avoid memory leaks
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animate each service card
    serviceRefs.current.forEach((el, index) => {
      if (!el) return;
      
      // Set initial state (invisible and slightly below)
      gsap.set(el, { 
        opacity: 0, 
        y: 50,
        scale: 0.98
      });

      // Create animation on scroll
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%', // Start animation when top of element is 80% from top of viewport
          toggleActions: 'play none none none',
          once: true
        },
        delay: index * 0.1 // Stagger the animations
      });

      // Add hover effect
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          y: -5,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          y: 0,
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Cleanup function
    return () => {
      serviceRefs.current.forEach(el => {
        if (el) {
          el.removeEventListener('mouseenter', () => {});
          el.removeEventListener('mouseleave', () => {});
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      id: 'ux-ui',
      title: 'UX/UI Design',
      subtitle: 'Design',
      description: 'We create visually stunning, user-friendly designs that enhance engagement and deliver a smooth digital experience.',
      videoSrc: '/assets/Web_design.mp4',
      features: [
        'User research & personas',
        'Competitors analysis',
        'Wireframes & prototypes',
        'Interactive & motion design',
        'Mobile-optimized design',
      ],
    },
    {
      id: 'development',
      title: 'Web Development',
      subtitle: 'Development',
      description: 'We build robust technical foundations that bring creative concepts to life while ensuring scalability for your growing business.',
      videoSrc: '/assets/development.mp4',
      features: [
        'Custom web development',
        'Full-stack development',
        'CMS integration',
        'E-commerce development',
        'Performance optimization',
      ],
    },
    {
      id: 'mobile-apps',
      title: 'Mobile Applications',
      subtitle: 'iOS & Android',
      description: 'We develop high-performance mobile applications that provide seamless user experiences across all devices and platforms.',
      videoSrc: '/assets/mobile_application.mp4',
      features: [
        'Native iOS & Android apps',
        'Cross-platform development',
        'UI/UX mobile design',
        'App store optimization',
        'API integration',
      ],
    },
    {
      id: 'motion-graphics',
      title: 'Motion Graphics',
      subtitle: 'Animation & Visuals',
      description: 'We create captivating motion graphics that bring your brand to life and communicate complex ideas in an engaging way.',
      videoSrc: '/assets/motion_graphics.mp4',
      features: [
        '2D & 3D animation',
        'Explainer videos',
        'Logo animations',
        'Motion graphics for web',
        'Social media content',
      ],
    },
    {
      id: 'branding',
      title: 'Branding',
      subtitle: 'Brand Identity',
      description: 'We craft memorable brand identities that resonate with your audience and establish a strong market presence.',
      videoSrc: '/assets/branding.mp4',
      features: [
        'Brand strategy',
        'Logo & visual identity',
        'Brand guidelines',
        'Marketing collateral',
        'Brand positioning',
      ],
    },
    {
      id: 'video-production',
      title: 'Video Production',
      subtitle: 'Filming & Editing',
      description: 'We produce high-quality video content that tells your brand\'s story and captivates your target audience.',
      videoSrc: '/assets/video_editing.mp4',
      features: [
        'Corporate videos',
        'Product demos',
        'Testimonial videos',
        'Social media content',
        'Post-production editing',
      ],
    },
  ];

  // ⭐ NEW ANIMATION (Option 3)


  

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="h-32"></div>

      <div
       
        className="relative max-w-7xl mx-auto px-8 pb-32"
        
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={el => {
              serviceRefs.current[index] = el;
            }}
            className="service-card story-card relative w-full bg-linear-to-br from-black to-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden p-8 md:p-10 mb-8 shadow-lg shadow-black/20 cursor-pointer transform-gpu will-change-transform"
          >

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-neutral-900 bg-clip-text text-transparent">
                  {service.title}
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-center h-full">
                <div className="video-container relative w-full h-full max-h-[300px] rounded-2xl overflow-hidden border border-neutral-700 transition-all duration-300">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={service.videoSrc} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-800 pt-6">
              <button
                className="btn-primary"
                onClick={() => console.log(`Viewing project: ${service.title}`)}
              >
                View Project
              </button>
              <p className="mt-3 text-sm text-gray-400">Explore our work for {service.title}</p>
            </div>

          </div>
        ))}
      </div>

      <OurApproachSection />
      <CTA/>
    </div>
  );
}
