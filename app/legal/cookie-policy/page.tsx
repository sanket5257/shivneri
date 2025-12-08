import React from 'react';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 pt-50">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p className="text-white leading-relaxed">
              Cookies are small text files that are stored on your device when you visit our website. They help us enhance your experience by remembering your preferences and tracking usage patterns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
                <p className="text-white">Required for the website to function properly, including security and basic features.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Performance Cookies</h3>
                <p className="text-white">Help us understand how visitors interact with our website by collecting and reporting information.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Functional Cookies</h3>
                <p className="text-white">Enable enhanced functionality and personalization, such as videos and live chats.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Marketing Cookies</h3>
                <p className="text-white">Used to track visitors across websites to display relevant advertisements.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>To remember your login details</li>
              <li>To track website performance and analytics</li>
              <li>To personalize your experience</li>
              <li>To serve relevant content and advertisements</li>
              <li>To improve our services based on user behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-white leading-relaxed mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>Browser settings to block or delete cookies</li>
              <li>Our cookie consent banner for preference management</li>
              <li>Third-party tools for enhanced cookie control</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookie Duration</h2>
            <div className="space-y-2 text-white">
              <p><strong>Session cookies:</strong> Deleted when you close your browser</p>
              <p><strong>Persistent cookies:</strong> Remain on your device for a set period or until deleted</p>
              <p><strong>Third-party cookies:</strong> Duration varies by provider</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <p className="text-white leading-relaxed">
              We may use third-party services that set their own cookies on your device. These include analytics providers, advertising networks, and social media platforms. Each third-party service has its own privacy policy and cookie policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <p className="text-white leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-white">
              If you have questions about our Cookie Policy, please contact us at cookies@shivneri.com
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
