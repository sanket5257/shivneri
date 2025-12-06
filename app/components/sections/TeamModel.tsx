import React from 'react';
import { Users, Database } from 'lucide-react';

export default function OrgChart() {
  return (
    <div className="min-h-screen mb-22 bg-black text-gray-400 p-16">

      <div className="mb-16">
        <button className="mb-8 px-6 py-2 rounded-full border border-neutral-700 text-white text-sm hover:border-gray-600 transition-colors">
          The Shivneri Team Model
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-2 text-white">
              Your Full-Stack
            </h1>
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-white">
              Product + Platform Team
            </h1>
          </div>

          <div>
            <p className="text-white text-base leading-relaxed">
              We blend product thinkers, engineers, and platform specialists into one high-performing unit.
              Skills roll on and off based on need—not arbitrary staffing.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full relative ">

        <div className="absolute -right-[350px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0 overflow-visible">
  <div className="absolute inset-0 rounded-full border-r-2 border-white/50 bg-gradient-to-br from-white/5 via-transparent to-transparent circle-gloss"></div>

  <div className="absolute right-[120px] top-1/2 -translate-y-1/2 -rotate-90 origin-center">
    <span className="text-gray-400 text-sm tracking-[0.4em] font-light">Automation</span>
  </div>
</div>


        {/* INNER ARC (Security) */}
        <div className="absolute -right-[225px] top-1/2 -translate-y-1/2 w-[450px] h-[450px] pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 border-r-2 border-white rounded-r-full circle-gloss"></div>
          <div className="absolute right-[80px] top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <span className="text-gray-400 text-sm tracking-[0.4em] font-light">Security</span>
          </div>
        </div>

        <div className="relative z-10 space-y-5">

          {/* PRODUCT TEAM */}
          <div className="border border-white/20 rounded-[28px] p-1 bg-black glossy-shine">
            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-5 p-5">

              {/* LEFT CARD */}
              <div className="border border-white/20 rounded-[20px] p-6 bg-black glossy-shine">
                <div className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center mb-6 bg-gray-900/30">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>

                <h2 className="text-[28px] font-light text-gray-200 mb-3 tracking-tight">
                  Product Team
                </h2>

                <p className="text-gray-500 leading-relaxed text-[14px]">
                  Designs and builds user-facing features, interfaces, and experiences.
                </p>
              </div>

              {/* ROLES */}
              <div className="flex flex-col justify-center space-y-4">

                <div className="text-center mb-1">
                  <div className="text-gray-500 text-[14px] font-light leading-tight">
                    Application<br />Architect
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    "UX/UI Designer",
                    "Front-End Developer",
                    "Back-End Developer",
                    "QA & Test Engineer",
                    "Data Engineer",
                    "AI Engineer",
                  ].map((role, idx) => (
                    <div
                      key={idx}
                      className="border border-white/20 rounded-[16px] px-4 py-3 text-center bg-black hover:border-white/30 transition-colors glossy-shine"
                    >
                      <span className="text-gray-400 text-[13px] font-light">{role}</span>
                    </div>
                  ))}
                </div>

                <div className="border border-white/20 rounded-[16px] px-4 py-3 text-center bg-black hover:border-white/30 transition-colors glossy-shine">
                  <span className="text-gray-400 text-[13px] font-light">
                    App Support & Operations
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* PLATFORM TEAM */}
          <div className="border border-white/20 rounded-[28px] p-1 bg-black glossy-shine">
            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-5 p-5">

              {/* LEFT CARD */}
              <div className="border border-white/20 rounded-[20px] p-6 bg-black glossy-shine">
                <div className="w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center mb-6 bg-gray-900/30">
                  <Database className="w-6 h-6 text-gray-500" />
                </div>

                <h2 className="text-[28px] font-light text-gray-200 mb-3 tracking-tight">
                  Platform Team
                </h2>

                <p className="text-gray-500 leading-relaxed text-[14px]">
                  Provides infrastructure, automation, and tooling for secure and scalable delivery.
                </p>
              </div>

              {/* ROLES */}
              <div className="flex flex-col justify-center space-y-4">

                <div className="text-center mb-1">
                  <div className="text-gray-500 text-[14px] font-light leading-tight">
                    Platform<br />Architect
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Site Reliability Engineer",
                    "Cloud Engineer",
                    "Network Engineer",
                    "Infrastructure Engineer",
                  ].map((role, idx) => (
                    <div
                      key={idx}
                      className="border border-white/20 rounded-[16px] px-4 py-3 text-center bg-black hover:border-white/30 transition-colors glossy-shine"
                    >
                      <span className="text-gray-400 text-[13px] font-light">{role}</span>
                    </div>
                  ))}
                </div>

                <div className="border border-white/20 rounded-[16px] px-4 py-3 text-center bg-black hover:border-white/30 transition-colors glossy-shine">
                  <span className="text-gray-400 text-[13px] font-light">
                    Platform Support & Operations
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
