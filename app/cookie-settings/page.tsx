'use client';

import React, { useState } from 'react';

export default function CookieSettings() {
  const [preferences, setPreferences] = useState({
    essential: true,
    performance: true,
    functional: false,
    marketing: false,
  });

  const handleToggle = (category: keyof typeof preferences) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSavePreferences = () => {
    // Save preferences to localStorage or cookie
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    // In a real app, you would also update actual cookie consent
    alert('Cookie preferences saved successfully!');
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      essential: true,
      performance: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allEnabled);
    localStorage.setItem('cookiePreferences', JSON.stringify(allEnabled));
    alert('All cookies accepted!');
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      performance: false,
      functional: false,
      marketing: false,
    };
    setPreferences(onlyEssential);
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyEssential));
    alert('Only essential cookies accepted!');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 pt-50">
        <h1 className="text-4xl font-bold mb-8">Cookie Settings</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Manage Your Cookie Preferences</h2>
            <p className="text-white leading-relaxed">
              We use cookies to enhance your experience, analyze site traffic, and personalize content. 
              You can choose which categories of cookies you want to allow. Essential cookies cannot be disabled 
              as they are required for the website to function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Cookie Categories</h2>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
                    <p className="text-gray-600">Required for the website to function properly</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="essential"
                      checked={preferences.essential}
                      disabled
                      className="sr-only"
                    />
                    <label className="flex items-center cursor-not-allowed">
                      <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  These cookies are necessary for the website to function and cannot be switched off in our systems. 
                  They are usually only set in response to actions made by you which amount to a request for services.
                </p>
              </div>

              {/* Performance Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Performance Cookies</h3>
                    <p className="text-gray-600">Help us understand how visitors interact with our website</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="performance"
                      checked={preferences.performance}
                      onChange={() => handleToggle('performance')}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="performance" 
                      className="flex items-center cursor-pointer"
                    >
                      <div className={`w-12 h-6 ${preferences.performance ? 'bg-blue-600' : 'bg-gray-300'} rounded-full transition-colors`}></div>
                      <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.performance ? 'translate-x-6' : ''}`}></div>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. 
                  They help us to know which pages are the most and least popular and see how visitors move around the site.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Functional Cookies</h3>
                    <p className="text-gray-600">Enable enhanced functionality and personalization</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="functional"
                      checked={preferences.functional}
                      onChange={() => handleToggle('functional')}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="functional" 
                      className="flex items-center cursor-pointer"
                    >
                      <div className={`w-12 h-6 ${preferences.functional ? 'bg-blue-600' : 'bg-gray-300'} rounded-full transition-colors`}></div>
                      <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.functional ? 'translate-x-6' : ''}`}></div>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers 
                  whose services we have added to our pages.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Marketing Cookies</h3>
                    <p className="text-gray-600">Used to track visitors across websites</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={preferences.marketing}
                      onChange={() => handleToggle('marketing')}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="marketing" 
                      className="flex items-center cursor-pointer"
                    >
                      <div className={`w-12 h-6 ${preferences.marketing ? 'bg-blue-600' : 'bg-gray-300'} rounded-full transition-colors`}></div>
                      <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.marketing ? 'translate-x-6' : ''}`}></div>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests 
                  and show you relevant adverts on other sites.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleRejectAll}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reject All (Except Essential)
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save My Preferences
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">More Information</h2>
            <p className="text-white leading-relaxed mb-4">
              For more detailed information about the cookies we use, please read our:
            </p>
            <div className="space-y-2">
              <a href="/legal/privacy-policy" className="text-blue-600 hover:underline block">
                Privacy Policy
              </a>
              <a href="/legal/cookie-policy" className="text-blue-600 hover:underline block">
                Cookie Policy
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-white">
              If you have any questions about our cookie settings, please contact us at cookies@shivneri.com
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
