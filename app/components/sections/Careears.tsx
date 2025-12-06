import React, { useEffect, useRef } from 'react';

const CareersHero = () => {
  const scrollTextRef = useRef(null);

  useEffect(() => {
    // Dynamically import gsap to avoid SSR issues
    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;
      
      const scrollText = scrollTextRef.current;
      if (scrollText) {
        // Create infinite horizontal scroll animation
        gsap.to(scrollText, {
          x: '-50%',
          duration: 20,
          ease: 'none',
          repeat: -1
        });
      }
    });
  }, []);

  return (
    <div id='careers' className="min-h-screen rounded-none sm:rounded-4xl bg-white flex flex-col">
      {/* Header */}
      <header className="">
         <div className="flex justify-center ">
          <span className="px-4 sm:px-6 py-1.5 sm:py-2 mt-12 sm:mt-16 border border-gray-600 rounded-full text-gray-400 text-xs sm:text-sm tracking-wider">
            Careers
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:pb-32">
        <div className="max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl font-semibold lg:text-7xl mb-6 sm:mb-8 leading-tight">
                <span className="text-neutral-500">Curious minds welcome.</span>
                <br />
                <span className="text-black">Egos left at the door.</span>
              </h1>
              
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group">
                <span>Let us know if you're a good fit</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right Column */}
            <div className="space-y-5 sm:space-y-6 md:space-y-8 text-neutral-600 text-base sm:text-lg leading-relaxed">
              <p>
                We're always on the lookout for people who love solving problems, building fast, and staying human while doing it. If you're tired of red tape and ready for real impact — let's talk.
              </p>
              
              <p>
                Agencies – it's not you, it's us. We invest most of our time delivering project outcomes and making clients super happy. We are happy with the small number of agencies we work with in our local markets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Text */}
      <div className="overflow-hidden bg-gradient-to-t from-gray-300 to-transparent py-10 sm:py-14 md:py-16">
        <div 
          ref={scrollTextRef}
          className="flex whitespace-nowrap"
          style={{ width: '200%' }}
        >
          <div className="flex items-center">
            <span className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-gray-400 mr-12 sm:mr-16 md:mr-24 lg:mr-32">
              the Movement
            </span>
            <span className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-gray-300 mr-12 sm:mr-16 md:mr-24 lg:mr-32">
              Join the Movement
            </span>
            <span className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-gray-400 mr-12 sm:mr-16 md:mr-24 lg:mr-32">
              the Movement
            </span>
            <span className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-gray-300 mr-12 sm:mr-16 md:mr-24 lg:mr-32">
              Join the Movement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersHero;