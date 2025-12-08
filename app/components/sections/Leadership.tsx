import React from 'react';
import { Linkedin } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const TeamMember = ({ name, title, description, imageUrl }: TeamMemberProps) => {

  return (
    <div className="relative group overflow-hidden rounded-lg">
      {/* Image Container */}
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-6 pt-12">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-gray-400 text-sm mb-1">{title}</p>
            <h3 className="text-white text-2xl font-light">{name}</h3>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </button>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function TeamShowcase() {
  return (
    <div id="leadership" className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto flex justify-center flex-col items-center">
         <div className="flex justify-center mb-12">
          <span className="px-6 py-2 border border-gray-600 rounded-full text-gray-400 text-sm tracking-wider">
            Meet The Team
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-semibold text-center mb-20 bg-linear-to-r from-neutral-300 via-neutral-400 to-neutral-500 bg-clip-text text-transparent">
         Led by Experts.
Driven by Builders.
        </h1>
        <div className="w-full max-w-md">
          <TeamMember
            name="Paul Bates"
            title="CRO & Co-Founder"
            description="20+ years helping customers solve complex IT challenges and scale with confidence. Ex-Proact. Strategic thinker, trusted advisor, and partner in progress."
            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"
          />
        </div>
      </div>
    </div>
  );
}