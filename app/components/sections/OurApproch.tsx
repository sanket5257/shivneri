"use client";

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

const OurApproachSection = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const logos = [
    "/assets/images/logo2.png",
    "/assets/images/logo2.png",
    "/assets/images/logo2.png",
    "/assets/images/logo2.png",
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const loadCarousel = () => {
        const items = Array.from(track.children);
        const originalWidth = track.scrollWidth; // Measure BEFORE cloning

        // Clone items for seamless looping
        items.forEach((item) => {
          const clone = item.cloneNode(true);
          track.appendChild(clone);
        });

        // GSAP Infinite Loop
        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: -originalWidth,
            duration: 16,
            ease: "none",
            repeat: -1,
          }
        );
      };

      // Wait for all logos to load
      const images = track.querySelectorAll("img");
      let loaded = 0;

      images.forEach((img) => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener("load", () => {
            loaded++;
            if (loaded === images.length) loadCarousel();
          });
        }
      });

      if (loaded === images.length) loadCarousel();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-black text-white px-6 md:px-12 lg:px-24 py-16 sm:py-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <span className="inline-block px-6 py-2 text-sm text-neutral-300 border border-neutral-700 rounded-full">
            Trusted by founders building the next generation of products
          </span>

          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-neutral-500">
              Built for founders,
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white">
              from first MVP <br className="hidden sm:block" />
              to global scale
            </h3>
          </div>

          <p className="text-neutral-400 max-w-3xl leading-relaxed">
            Founders, CTOs, and product leaders come to us to ship AI products and full-stack software fast — then stay on
            to run and scale them. Senior engineers who own outcomes, from first commit to production. No handoffs, no
            bloat, no context lost.
          </p>
        </div>

        {/* RIGHT — GSAP LOGO CAROUSEL */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md lg:max-w-lg h-64 rounded-[36px] overflow-hidden border border-neutral-800 bg-linear-to-b from-black/60 via-black/50 to-black/40 p-6 flex items-center">

            <div
              ref={trackRef}
              className="inline-flex flex-nowrap items-center space-x-16 opacity-90"
            >
              {logos.map((logo, idx) => (
                <div
                  key={idx}
                  className="w-32 md:w-40 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt={`logo-${idx}`}
                    className="w-full object-contain filter grayscale opacity-80 hover:opacity-100 transition"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OurApproachSection;
