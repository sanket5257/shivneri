import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaGithub, FaYoutube, FaFacebook } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import Link from 'next/link';

export default function ModernFooter() {
  const services = [
    { name: 'Development', path: '/services/development' },
    { name: 'Platforms', path: '/services/platforms' },
    { name: 'Operate & Innovate', path: '/services/operate-innovate' }
  ];

  const assessments = [
    { name: 'App Security & Compliance', path: '/assessments/security-compliance' },
    { name: 'Cloud Cost Optimization', path: '/assessments/cloud-optimization' },
    { name: 'Internal Developer Platforms', path: '/assessments/developer-platforms' }
  ];

  const company = [
    { name: 'Customer Stories', path: '/company/customer-stories' },
    { name: 'Partners', path: '/company/partners' },
    { name: 'How We Work', path: '/company/how-we-work' },
    { name: 'Careers', path: '/about#careers' }
  ];

  const about = [
    { name: 'Our Mission', path: '/about/mission' },
    { name: "Shivneri's Journey", path: '/about/journey' },
    { name: 'Leadership Team', path: '/about/leadership' },
    { name: 'Contact', path: '/about#contact' }
  ];

  const contacts = [
    { region: 'India', phone: '+91 12345 67890' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/legal/privacy-policy' },
    { name: 'Cookie Policy', path: '/legal/cookie-policy' },
    { name: 'Code of Conduct', path: '/legal/code-of-conduct' },
    { name: 'Sustainability Policy', path: '/legal/sustainability-policy' },
    { name: 'Modern Slavery Policy', path: '/legal/modern-slavery-policy' },
    { name: 'Cookie Settings', path: '/cookie-settings' }
  ];

  return (
    <footer className="relative overflow-hidden text-white">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video 
          className="w-full h-full object-cover"
          src="/assets/Homepage X Hero Video (1).mp4" 
          autoPlay 
          loop 
          muted
          
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }}
        />
      </div>
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
            <div className="lg:w-1/2">
              <Link href="/" className="inline-block mb-8 md:mb-12 lg:mb-20">
                <img 
                  src="../assets/images/logo2.png" 
                  alt="Shivneri Systems" 
                  className="h-7 sm:h-8 w-auto" 
                  width={120}
                  height={32}
                />
              </Link>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 sm:mb-6">
                Let's build<br />
                something<br />
                great together.
              </h2>
              <p className="text-gray-400 text-base sm:text-lg">
                Connect with our engineers to scope your next step.
              </p>
            </div>

            <div className="lg:w-1/2">
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-start lg:justify-end mb-8 md:mb-12">
                <a 
                  href="mailto:contact@shivneri.com"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
                  aria-label="Email us"
                >
                  <Mail size={18} className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="tel:+911234567890"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
                  aria-label="Call us"
                >
                  <Phone size={18} className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
                  aria-label="Our location"
                >
                  <MapPin size={18} className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 border-t border-white/10 pt-8 sm:pt-12">
                {/* Services */}
                <div>
                  <h3 className="font-medium mb-3 sm:mb-4 text-white text-sm sm:text-base">Services</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {services.map((item, i) => (
                      <li key={i}>
                        <Link href={item.path} className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Assessments */}
                <div>
                  <h3 className="font-medium mb-3 sm:mb-4 text-white text-sm sm:text-base">Assessments</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {assessments.map((item, i) => (
                      <li key={i}>
                        <Link href={item.path} className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div className="mt-6 sm:mt-0">
                  <h3 className="font-medium mb-3 sm:mb-4 text-white text-sm sm:text-base">Company</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {company.map((item, i) => (
                      <li key={i}>
                        <Link href={item.path} className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* About */}
                <div className="mt-6 sm:mt-0">
                  <h3 className="font-medium mb-3 sm:mb-4 text-white text-sm sm:text-base">About</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {about.map((item, i) => (
                      <li key={i}>
                        <Link href={item.path} className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 mt-8 sm:mt-12 pt-8 sm:pt-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                  {/* Phone Numbers */}
                  <div className="space-y-2 sm:space-y-3">
                    {contacts.map((contact, i) => (
                      <div key={i} className="text-xs sm:text-sm">
                        <span className="text-white">{contact.region}:</span>
                        <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-gray-400 hover:text-white ml-2">
                          {contact.phone}
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div className="sm:text-center">
                    <a 
                      href="mailto:sayhello@shivneri.com" 
                      className="text-gray-400 hover:text-white text-xs sm:text-sm inline-block"
                    >
                      sayhello@shivneri.com
                    </a>
                  </div>

                  {/* Address */}
                  <div className="text-left sm:text-right text-xs sm:text-sm text-gray-400">
                    <div>Shivneri Tech Park</div>
                    <div>Ichalkaranji</div>
                    <div>Maharashtra 416115</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm">
              {legalLinks.map((link, i) => (
                <React.Fragment key={i}>
                  <Link 
                    href={link.path} 
                    className="text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                  {i < legalLinks.length - 1 && (
                    <span className="text-gray-700 hidden sm:inline">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Shivneri Systems Pvt. Ltd.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}