'use client'
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProductsPage = () => {
  const products = [
    {
      name: 'School Portal',
      tagline: 'Education Management',
      sector: 'EdTech',
      title: 'Comprehensive School Management System for Modern Educational Institutions',
      description: 'Streamline student enrollment, attendance tracking, grade management, and parent communication with our intuitive platform designed for K-12 schools.',
      features: ['Student Management', 'Attendance Tracking', 'Grade Management', 'Parent Portal'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: '#3B82F6'
    },
    {
      name: 'SmartBiz',
      tagline: 'Business Solutions',
      sector: 'SaaS',
      title: 'All-in-One Business Management Platform to Scale Your Operations',
      description: 'From inventory management to customer relations, SmartBiz provides the tools you need to run your business efficiently and grow with confidence.',
      features: ['Inventory Control', 'CRM Integration', 'Financial Reports', 'Team Collaboration'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: '#10B981'
    },
    {
      name: 'College Portal',
      tagline: 'Higher Education',
      sector: 'EdTech',
      title: 'Advanced Portal for Higher Education Management and Student Services',
      description: 'Manage courses, faculty, admissions, and student services with a robust platform built specifically for colleges and universities.',
      features: ['Course Management', 'Faculty Portal', 'Admissions System', 'Student Services'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      color: '#F59E0B'
    },
    {
      name: 'SMS Portal',
      tagline: 'Communication',
      sector: 'Marketing Tech',
      title: 'Robust SMS Platform for Customer Engagement at Scale',
      description: 'Connect with your customers through powerful text messaging campaigns, automated workflows, and real-time analytics.',
      features: ['Bulk Messaging', 'Campaign Management', 'Analytics Dashboard', 'API Integration'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: '#EF4444'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Background Video */}
      <div className="relative pt-24 md:pt-32 lg:pt-40 flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          src="/assets/uptic-circle.mp4"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 md:py-16 lg:py-20">
          <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 border border-gray-700 rounded-full text-xs md:text-sm text-gray-300 mb-6 md:mb-8">
            Our Products
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 md:mb-6 leading-tight">
            Built for Scale.
            <br />
            Designed for Impact.
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-0">
            Powerful solutions that transform how you manage education, business operations, and customer communications.
          </p>
        </div>
        
        {/* Decorative wave pattern at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Secondary Header Section */}
      <div className="bg-black py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 border border-gray-700 rounded-full text-xs md:text-sm text-gray-300 mb-6 md:mb-8">
            Innovation Meets Simplicity
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-4">
            Discover solutions that
            <br className="hidden sm:block" />
            streamline operations, boost
            <br className="hidden sm:block" />
            <span className="text-gray-600">productivity and drive growth.</span>
          </h2>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="story-card p-6 sm:p-8 lg:p-10 flex flex-col justify-between group h-full"
              >
                {/* Header Section */}
                <div>
                  {/* Logo and Industry Tags */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: `${product.color}20`, border: `1px solid ${product.color}40` }}
                      >
                        <div style={{ color: product.color }} className="w-5 h-5 sm:w-6 sm:h-6">
                          {product.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-normal tracking-tight">
                          {product.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">
                          {product.tagline}
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 sm:px-4 sm:py-1.5 border border-gray-700 rounded-full text-xs text-gray-400 self-start sm:self-auto">
                      {product.sector}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-light leading-tight mb-3 sm:mb-4 text-white">
                    {product.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                    {product.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-gray-900 border border-gray-800 rounded-full text-2xs sm:text-xs text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="border-t border-gray-800 pt-4 sm:pt-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-normal text-white mb-0.5 sm:mb-1">
                      Learn More
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Explore features and pricing
                    </p>
                  </div>
                  <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-700 flex-shrink-0 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group-hover:border-gray-600">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-800 rounded-2xl bg-gradient-to-br from-gray-900/50 to-transparent">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-3 sm:mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              We're constantly expanding our product offerings. Let us know your requirements, and we'll help you find or build the perfect solution.
            </p>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base">
              Contact Sales
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .story-card {
          background: linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
          border: 1px solid rgba(55, 65, 81, 0.3);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }
        
        .story-card:hover {
          border-color: rgba(107, 114, 128, 0.5);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;