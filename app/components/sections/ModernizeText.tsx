'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollTextEffect = () => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const chars = textRef.current.querySelectorAll('.char');
    const ctx = gsap.context(() => {
      // Initial state for all characters
      gsap.set(chars, {
        opacity: 0.3,
        color: '#666666',
        textShadow: 'none',
        y: 20
      });

      // Create a timeline for the text reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Animate each character with a staggered effect
            chars.forEach((char, i) => {
              const charProgress = (progress * chars.length - i) / 10;
              const opacity = Math.min(Math.max(0.3 + charProgress * 0.7, 0.3), 1);
              const glowIntensity = Math.min(Math.max(charProgress, 0), 1);
              
              const element = char as HTMLElement;
              
              gsap.to(element, {
                opacity: opacity,
                y: -10 * (1 - progress),
                color: glowIntensity > 0 ? '#ffffff' : '#666666',
                textShadow: glowIntensity > 0 
                  ? `0 0 ${20 + glowIntensity * 20}px rgba(255, 140, 66, ${0.7 + glowIntensity * 0.3})`
                  : 'none',
                duration: 0.5,
                ease: 'power2.out'
              });
            });
          }
        }
      });
    }, textRef);
    
    return () => ctx.revert(); // Cleanup
  }, []);
  
  const text = "We help ambitious\ncompanies ship faster, scale\nsmarter, and modernize\nwithout compromise.";
  // Split by spaces but preserve newlines
  const words = text.split(/(\s+)/).filter(word => word.trim() !== '' || word.includes('\n'));
  
  return (
    <div className="bg-black">
      {/* Spacer to enable scrolling */}
      
      <section className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
        <div className="max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto w-full">
          <h2 
            ref={textRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight text-center pt-16 sm:pt-20 md:pt-24 lg:pt-32"
          >
            {words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                {word === '\n' ? (
                  <br key={`br-${wordIndex}`} />
                ) : (
                  <>
                    {word.split('').map((char, charIndex) => (
                      <span 
                        key={`${wordIndex}-${charIndex}`} 
                        className="char inline-block"
                        style={{ 
                          opacity: 0.3,
                          color: '#666666',
                          display: 'inline-block',
                          willChange: 'transform, opacity, text-shadow, color',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }}
                      >
                        {char}
                      </span>
                    ))}
                    {wordIndex < words.length - 1 && words[wordIndex + 1] !== '\n' && (
                      <span 
                      className="char" 
                      style={{ 
                        opacity: 0.3, 
                        color: '#666666',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    > 
                      {' '}
                    </span>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </h2>
        </div>
      </section>
      
      {/* <div className="h-screen" /> */}
      {/* Bottom spacer */}
    </div>
  );
};

export default ScrollTextEffect;