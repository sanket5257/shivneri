import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 pt-50">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-white leading-relaxed">
              At Shivneri, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Personal Information</h3>
                <p className="text-white">Name, email address, phone number, and other contact details you provide.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Usage Data</h3>
                <p className="text-white">Information about how you interact with our services, including IP addresses and browsing behavior.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Technical Data</h3>
                <p className="text-white">Device information, browser type, and technical details about your connection.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>To provide and maintain our services</li>
              <li>To communicate with you about your projects</li>
              <li>To improve our services and user experience</li>
              <li>To ensure security and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
            <p className="text-white leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>Right to access your personal data</li>
              <li>Right to rectify inaccurate information</li>
              <li>Right to request deletion of your data</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-white">
              If you have any questions about this Privacy Policy, please contact us at privacy@shivneri.com
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
