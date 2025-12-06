import React from 'react';
import { MapPin, Shield, Lightbulb } from 'lucide-react';

const WhereWeWork = () => {
  const location = {
    city: 'Kolhapur, India',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2272.079122656418!2d74.45311016151875!3d16.718548202270377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc11dc168db2df3%3A0x38067f7a2e81886d!2sShivneri%20Systems%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1764828981119!5m2!1sen!2sin',
    contacts: [
      { type: 'Sales', phone: '+91 231 123 4567' },
      { type: 'Support', phone: '+91 231 765 4321' }
    ]
  };

  return (
    <div id="contact" className="min-h-screen bg-black text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Header */}
      <header className="flex justify-center pb-12 sm:pb-16">
        <button className="px-6 py-2 border border-gray-600 rounded-full text-gray-300 hover:border-gray-400 transition-colors">
          Contact
        </button>
      </header>

      {/* Title */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-5xl xs:text-6xl sm:text-7xl lg:text-8xl font-semibold leading-tight">
          <span className="text-neutral-500">Where</span>{' '}
          <span className="text-white">we</span>{' '}
          <span className="text-neutral-500">Work</span>
        </h1>
      </div>

      {/* Location Card */}
      <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
        <div className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Map Section */}
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
              <iframe 
                src={location.mapEmbed}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
              
              {/* Map Pin Overlay */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl font-light mb-6 sm:mb-8">{location.city}</h3>
              
              <div className="space-y-4">
                {location.contacts.map((contact, idx) => (
                  <div key={idx} className="flex justify-between items-center text-base sm:text-lg border-b border-gray-800 pb-3 sm:pb-4">
                    <span className="text-gray-400">{contact.type}</span>
                    <span className="text-gray-300">{contact.phone}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-gray-400 text-sm">
                  Shivneri Systems Pvt. Ltd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Contact Section */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-10 md:gap-12 pt-8 sm:pt-10 md:pt-12 border-t border-gray-800 px-4 sm:px-6">
        {/* Support */}
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1a1a1a] rounded-full flex-shrink-0 flex items-center justify-center border border-gray-800">
            <Shield className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <div className="text-gray-400 text-xs sm:text-sm mb-0.5 sm:mb-1">Support</div>
            <a href="mailto:sayhello@example.com" className="text-gray-300 hover:text-white transition-colors">
              sayhello@example.com
            </a>
          </div>
        </div>

        {/* Sales */}
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1a1a1a] rounded-full flex-shrink-0 flex items-center justify-center border border-gray-800">
            <Lightbulb className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <div className="text-gray-400 text-xs sm:text-sm mb-0.5 sm:mb-1">Sales</div>
            <a href="mailto:sayhello@example.com" className="text-gray-300 hover:text-white transition-colors">
              sayhello@example.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhereWeWork;