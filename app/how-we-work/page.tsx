"use client"

import React, { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import TeamModel from '../components/sections/TeamModel';
import CTA from '../components/sections/CTA';
import gsap from 'gsap';

const Page = () => {
  const bgImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);
  return (
    <div className="bg-black text-white relative overflow-hidden flex flex-col items-center">
      {/* Background Image */}
      <img 
        ref={bgImageRef}
        className='absolute opacity-50 top-0 left-0 w-full h-auto -translate-y-1/2 transform-gpu origin-center min-w-[1200px] md:min-w-full'
        src="/assets/images/68c97f8d935467f69535950d_Frame 1171275157.svg" 
        alt="" 
      />
      
      <div className="relative z-10 w-full text-center">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-12 sm:pb-20 text-center">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <button className="mb-6 sm:mb-12 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-neutral-700 text-neutral-400 text-xs sm:text-sm hover:border-gray-600 transition-colors">
              How we work
            </button>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-600 text-transparent bg-clip-text px-2">
              A Better Way to<br className="hidden sm:block" />
              Build Software
            </h1>
            
            <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl px-2 sm:px-0">
              A smarter model. Leaner teams. Faster outcomes. This is the new
              way to build, scale, and support software.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex justify-center px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start w-full max-w-6xl mx-auto pb-12 md:pb-16">
            {/* Left Column */}
            <div className="flex flex-col items-center md:items-start">
              <button className="mb-4 sm:mb-6 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-neutral-700 text-neutral-400 text-xs sm:text-sm hover:border-gray-600 transition-colors">
                Choosing the Right Model
              </button>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 leading-tight text-center md:text-left">
                Not All Models<br />
                Are <span className="font-normal">Built Equal</span>
              </h2>
              
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-center md:text-left">
                Long-term platform success demands continuity, knowledge retention, and
                proactive evolution—not just reactive fixes.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-2 sm:space-y-4 pt-0 sm:pt-4 flex flex-col justify-start items-start">
              <p className="text-neutral-400 text-base sm:text-lg mb-3 sm:mb-4 text-center w-full md:text-left">
                Shivneri offers a different kind of model:
              </p>
              
              <div className="space-y-2 sm:space-y-4 flex flex-col justify-start items-start w-full">
                <div className="flex items-center justify-start gap-3 sm:gap-4 py-2 sm:py-3 w-full">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-neutral-400" />
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                    Senior FTE talent, engaged from day one
                  </p>
                </div>
                
                <div className="flex items-center justify-start gap-3 sm:gap-4 py-2 sm:py-3 w-full">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-neutral-400" />
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                    Modular teams that flex to fit
                  </p>
                </div>
                
                <div className="flex items-center justify-start gap-3 sm:gap-4 py-2 sm:py-3 w-full">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-neutral-400" />
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                    Clear ownership from build to support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-16 sm:h-32 md:h-40 w-full'></div>
      <TeamModel />
      <CTA/>
    </div>
  );
};

export default Page;