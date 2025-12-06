'use client';

import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const Portal = dynamic(() => import('./ui/Portal'), { ssr: false });

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    jobTitle: '',
    email: '',
    phone: '',
    projectDescription: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Here you would typically make an API call
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/80 z-100 flex items-center justify-center p-4">
        <div className="bg-[#1A1A1A] rounded-2xl w-full max-w-2xl relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>
        
        <div className="p-10">
          <h2 className="text-3xl font-semibold text-white mb-3">Book a 30-Minute Consultation</h2>
          <p className="text-white/60 mb-8 text-lg">Let's discuss how we can help accelerate your project</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-white/80 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {errors.businessName && <p className="mt-2 text-sm text-red-500">{errors.businessName}</p>}
              </div>
              
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-white/80 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {errors.jobTitle && <p className="mt-2 text-sm text-red-500">{errors.jobTitle}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
              </div>
            </div>
            
            <div className="mt-2">
              <label htmlFor="projectDescription" className="block text-sm font-medium text-white/80 mb-2">
                Project Description
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your project, goals, and how we can help..."
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn btn-primary "  >
                Submit
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </Portal>
  );
}
