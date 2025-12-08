import React, { useEffect, useRef } from 'react';
import { ArrowRight, Cloud, Github, Code2, Database, Layers, Box, Settings, Zap, Server, GitBranch, Container } from 'lucide-react';
import { gsap } from 'gsap';

interface TechStack {
  name: string;
  icon: React.ReactNode;
  category: string;
}

const TechStackCarousel: React.FC = () => {
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const techStackRow1: TechStack[] = [
    { name: 'React', icon: <Code2 className="w-10 h-10" />, category: 'Frontend' },
    { name: 'Next.js', icon: <Layers className="w-10 h-10" />, category: 'Framework' },
    { name: 'Node.js', icon: <Server className="w-10 h-10" />, category: 'Backend' },
    { name: '.NET Core', icon: <Code2 className="w-10 h-10" />, category: 'Backend' },
    { name: 'TypeScript', icon: <Code2 className="w-10 h-10" />, category: 'Language' },
    { name: 'Tailwind CSS', icon: <Code2 className="w-10 h-10" />, category: 'Styling' },
    { name: 'GraphQL', icon: <Layers className="w-10 h-10" />, category: 'API' },
    { name: 'MongoDB', icon: <Database className="w-10 h-10" />, category: 'Database' },
    { name: 'PostgreSQL', icon: <Database className="w-10 h-10" />, category: 'Database' },
    { name: 'Redis', icon: <Zap className="w-10 h-10" />, category: 'Cache' },
  ];

  const techStackRow2: TechStack[] = [
    { name: 'AWS', icon: <Cloud className="w-10 h-10" />, category: 'Cloud' },
    { name: 'AWS DevOps', icon: <Settings className="w-10 h-10" />, category: 'DevOps' },
    { name: 'GCP', icon: <Cloud className="w-10 h-10" />, category: 'Cloud' },
    { name: 'Azure', icon: <Cloud className="w-10 h-10" />, category: 'Cloud' },
    { name: 'Docker', icon: <Container className="w-10 h-10" />, category: 'Container' },
    { name: 'Kubernetes', icon: <Box className="w-10 h-10" />, category: 'Orchestration' },
    { name: 'Terraform', icon: <Settings className="w-10 h-10" />, category: 'IaC' },
    { name: 'GitHub Actions', icon: <Github className="w-10 h-10" />, category: 'CI/CD' },
    { name: 'GitLab CI', icon: <GitBranch className="w-10 h-10" />, category: 'CI/CD' },
    { name: 'Jenkins', icon: <Settings className="w-10 h-10" />, category: 'CI/CD' },
    { name: 'Grafana', icon: <Layers className="w-10 h-10" />, category: 'Monitoring' },
    { name: 'Prometheus', icon: <Server className="w-10 h-10" />, category: 'Monitoring' },
  ];

  useEffect(() => {
    if (!headerRef.current) return;

    const header = headerRef.current;
    
    // Header animation
    gsap.fromTo(header.children,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    // Infinite marquee animation
    const createMarquee = (ref: React.RefObject<HTMLDivElement | null>, duration: number, reverse: boolean = false) => {
      if (!ref.current) return;
      
      const marqueeContent = ref.current.querySelector('.marquee-content');
      if (!marqueeContent) return;

      const marqueeWidth = marqueeContent.scrollWidth / 2;
      
      gsap.to(marqueeContent, {
        x: reverse ? 0 : -marqueeWidth,
        duration: duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const value = parseFloat(x);
            return reverse 
              ? `${value % marqueeWidth}px`
              : `${value % marqueeWidth}px`;
          }
        }
      });

      gsap.set(marqueeContent, { x: reverse ? -marqueeWidth : 0 });
    };

    createMarquee(marqueeRef1, 40, false);
    createMarquee(marqueeRef2, 45, true);

  }, []);

  const renderMarqueeRow = (techStack: TechStack[], duplicate: number = 3) => {
    const items = Array(duplicate).fill(techStack).flat();
    
    return items.map((tech, index) => (
      <div
        key={index}
        className="tech-card flex-shrink-0 group mx-4"
      >
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden">
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-white/90 mb-6 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500 shadow-lg">
              {tech.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-white/90 group-hover:text-white transition-colors duration-300">
                {tech.name}
              </h3>
              <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300 font-light tracking-wide">
                {tech.category}
              </p>
            </div>
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 overflow-hidden relative">
      {/* Subtle background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10 mb-24">
        <div ref={headerRef}>
          <button className="px-6 py-2.5 border border-white/20 rounded-full text-white/70 hover:border-white/40 hover:text-white transition-all duration-300 mb-16 backdrop-blur-sm">
            Tech Stack
          </button>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Left Section */}
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-semibold mb-4 leading-tight">
                Built with<br />
                <span className="font-semibold text-white">
                  Modern Tools
                </span>
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center">
              <p className="text-white/60 text-lg md:text-xl mb-8 leading-relaxed">
                From React and .NET to GitOps and IaC, we use proven, scalable tech to deliver robust apps that grow with your business.
              </p>
              
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-8 mb-24">
        {/* Row 1 - Left to Right */}
        <div ref={marqueeRef1} className="relative overflow-hidden py-4">
          <div className="marquee-content flex">
            {renderMarqueeRow(techStackRow1)}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div ref={marqueeRef2} className="relative overflow-hidden py-4">
          <div className="marquee-content flex">
            {renderMarqueeRow(techStackRow2)}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 hover:from-white/[0.09] hover:to-white/[0.03] transition-all duration-300">
            <div className="text-5xl font-bold text-white mb-3">22+</div>
            <div className="text-white/50 text-sm tracking-wide">Technologies</div>
          </div>
          <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 hover:from-white/[0.09] hover:to-white/[0.03] transition-all duration-300">
            <div className="text-5xl font-bold text-white mb-3">100%</div>
            <div className="text-white/50 text-sm tracking-wide">Cloud Native</div>
          </div>
          <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 hover:from-white/[0.09] hover:to-white/[0.03] transition-all duration-300">
            <div className="text-5xl font-bold text-white mb-3">24/7</div>
            <div className="text-white/50 text-sm tracking-wide">Monitoring</div>
          </div>
          <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 hover:from-white/[0.09] hover:to-white/[0.03] transition-all duration-300">
            <div className="text-5xl font-bold text-white mb-3">∞</div>
            <div className="text-white/50 text-sm tracking-wide">Scalability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackCarousel;