import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JourneyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const milestones = [
    {
      year: '2022',
      title: 'Development Launch',
      description: 'Capabilities to include modern full-stack development services from UI to AI.'
    },
    {
      year: '2023',
      title: 'Delivery Innovation',
      description: 'Delivery models evolve from project work to fractional product & platform teams.'
    },
    {
      year: '2024',
      title: 'USA Expansion',
      description: 'USA market expansion, Matt Keenan joins the founding team.'
    },
    {
      year: '2025',
      title: 'Global Reach',
      description: 'Expanding services globally with new partnerships and innovative solutions.'
    },
    {
      year: '2026',
      title: 'AI Integration',
      description: 'Full-scale AI integration across all development and delivery processes.'
    }
  ];

  useEffect(() => {
    // Animate the title on load
    gsap.from('.journey-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const speed = 1 + (index * 0.2); // Different speed for each card

      // Parallax effect - cards move at different speeds
      gsap.to(card, {
        y: () => -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Fade in animation
      ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(card, {
            opacity: self.progress,
            scale: 0.9 + (self.progress * 0.1),
            duration: 0
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="flex items-center justify-center relative overflow-hidden journey-title py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-7xl font-bold bg-gradient-to-br from-white via-gray-200 to-gray-600 bg-clip-text text-transparent tracking-tighter relative z-10 px-4 text-center leading-none">
          Our Journey
        </h1>
      </div>

      {/* Parallax Timeline Section */}
      <div ref={containerRef} className="relative bg-black py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-40">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-16 opacity-0`}
            >
              {/* Year Section */}
              <div className="flex-shrink-0 w-full md:w-1/3">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/5 blur-3xl"></div>
                  <div className="relative text-center md:text-left">
                    <div className="inline-block border-2 border-gray-700 rounded-2xl px-6 py-4 mb-4 backdrop-blur-sm bg-zinc-900/50">
                      <span className="text-sm font-medium text-gray-400 tracking-widest">MILESTONE</span>
                    </div>
                    <div className="text-8xl sm:text-9xl md:text-[10rem] font-black bg-gradient-to-br from-white via-gray-400 to-gray-700 bg-clip-text text-transparent leading-none tracking-tighter">
                      {milestone.year}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-gray-800 rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl group-hover:border-gray-600 group-hover:shadow-[0_20px_80px_rgba(255,255,255,0.1)] transition-all duration-700">
                    {/* Background grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03]">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                      }}></div>
                    </div>

                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 rounded-3xl"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight tracking-tight">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-8">
                        {milestone.description}
                      </p>

                      {/* Decorative element */}
                      <div className="flex items-center gap-3">
                        <div className="h-px w-12 bg-gradient-to-r from-white to-transparent"></div>
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                        <div className="h-px w-8 bg-gradient-to-r from-white to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating accent */}
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default JourneyTimeline;