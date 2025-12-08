import React, { useEffect, useRef } from 'react';
import { ArrowRight, Cloud, Github, Code2, Database, Layers, Box, Settings, Zap, Server, GitBranch, Container } from 'lucide-react';
import { gsap } from 'gsap';

interface TechStack {
  name: string;
  icon: React.ReactNode;
}

const TechStackCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const techStackData: TechStack[] = [
    { name: 'React', icon: <Code2 className="w-8 h-8" /> },
    { name: 'Next.js', icon: <Layers className="w-8 h-8" /> },
    { name: 'Node.js', icon: <Server className="w-8 h-8" /> },
    { name: '.NET Core', icon: <Code2 className="w-8 h-8" /> },
    { name: 'TypeScript', icon: <Code2 className="w-8 h-8" /> },
    
    { name: 'AWS', icon: <Cloud className="w-8 h-8" /> },
    { name: 'AWS DevOps', icon: <Settings className="w-8 h-8" /> },
    { name: 'GCP', icon: <Cloud className="w-8 h-8" /> },
    { name: 'Azure', icon: <Cloud className="w-8 h-8" /> },
    { name: 'DigitalOcean', icon: <Cloud className="w-8 h-8" /> },
    
    { name: 'Docker', icon: <Container className="w-8 h-8" /> },
    { name: 'Kubernetes', icon: <Box className="w-8 h-8" /> },
    { name: 'Terraform', icon: <Settings className="w-8 h-8" /> },
    { name: 'GitHub Actions', icon: <Github className="w-8 h-8" /> },
    { name: 'GitLab CI', icon: <GitBranch className="w-8 h-8" /> },
    
    { name: 'MongoDB', icon: <Database className="w-8 h-8" /> },
    { name: 'PostgreSQL', icon: <Database className="w-8 h-8" /> },
    { name: 'Redis', icon: <Zap className="w-8 h-8" /> },
    { name: 'Grafana', icon: <Layers className="w-8 h-8" /> },
    { name: 'Prometheus', icon: <Server className="w-8 h-8" /> },
    
    { name: 'Tailwind CSS', icon: <Code2 className="w-8 h-8" /> },
    { name: 'GraphQL', icon: <Layers className="w-8 h-8" /> },
    { name: 'Nginx', icon: <Server className="w-8 h-8" /> },
    { name: 'Jenkins', icon: <Settings className="w-8 h-8" /> },
    { name: 'Ansible', icon: <Settings className="w-8 h-8" /> },
  ];

  useEffect(() => {
    if (!carouselRef.current || !headerRef.current) return;

    const cards = carouselRef.current.querySelectorAll('.tech-card');
    const header = headerRef.current;
    
    // Header animation
    gsap.fromTo(header.children,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    // Initial card animation with wave effect
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotateX: -15
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: {
          amount: 1.2,
          from: "start",
          ease: "power2.out"
        },
        ease: "back.out(1.2)"
      }
    );

    // Continuous floating animation with different patterns
    cards.forEach((card, index) => {
      const row = Math.floor(index / 5);
      const col = index % 5;
      
      gsap.to(card, {
        y: -15 + (col * 2),
        duration: 2.5 + (row * 0.3),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (col * 0.15) + (row * 0.2)
      });

      // Add subtle rotation
      gsap.to(card, {
        rotateZ: (col % 2 === 0 ? 1 : -1) * 1.5,
        duration: 3 + (index * 0.1),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
    });

    // Enhanced hover effects
    cards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.08,
          y: -20,
          rotateZ: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Glow effect
        gsap.to(card, {
          boxShadow: '0 20px 60px -10px rgba(255, 255, 255, 0.2)',
          duration: 0.4
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
          duration: 0.4,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Parallax scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      gsap.to(cards, {
        y: (i) => scrollY * (0.1 + (i % 3) * 0.05),
        duration: 0.5
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 overflow-hidden relative">
      {/* Subtle background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10">
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

        {/* Tech Stack Grid */}
        <div ref={carouselRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 perspective-1000">
          {techStackData.map((tech, index) => (
            <div
              key={index}
              className="tech-card bg-white/[0.03] backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-white/80 mb-4 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                {tech.icon}
              </div>
              <span className="text-lg md:text-xl font-light text-white/70 group-hover:text-white transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
            <div className="text-4xl font-bold text-white mb-2">25+</div>
            <div className="text-white/50">Technologies</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-white/50">Cloud Native</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/50">Monitoring</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
            <div className="text-4xl font-bold text-white mb-2">∞</div>
            <div className="text-white/50">Scalability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackCarousel;