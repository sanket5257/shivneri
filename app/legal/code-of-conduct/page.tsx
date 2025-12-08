import React from 'react';

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 pt-50">
        <h1 className="text-4xl font-bold mb-8">Code of Conduct</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <p className="text-white leading-relaxed">
              At Shivneri, we are committed to providing a welcoming and inclusive environment for everyone who interacts with our company, employees, clients, and partners. This Code of Conduct outlines our expectations for behavior and the standards we uphold.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Respect</h3>
                <p className="text-white">We treat everyone with dignity and respect, valuing diverse perspectives and experiences.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Integrity</h3>
                <p className="text-white">We act honestly and ethically in all our interactions and business dealings.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Inclusivity</h3>
                <p className="text-white">We celebrate diversity and ensure everyone feels welcome and valued.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Professionalism</h3>
                <p className="text-white">We maintain high standards of professional behavior in all situations.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Expected Behavior</h2>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>Treat all individuals with respect and consideration</li>
              <li>Communicate professionally and constructively</li>
              <li>Be inclusive and welcoming to all participants</li>
              <li>Focus on what is best for the community and our clients</li>
              <li>Show empathy towards other community members</li>
              <li>Respect different viewpoints and experiences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Unacceptable Behavior</h2>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>Harassment, discrimination, or bullying</li>
              <li>Use of sexual language or imagery</li>
              <li>Deliberate intimidation, stalking, or following</li>
              <li>Disruptive behavior that interferes with others' participation</li>
              <li>Sharing private information without consent</li>
              <li>Violent threats or language</li>
              <li>Any other conduct that could reasonably be considered inappropriate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Reporting Guidelines</h2>
            <p className="text-white leading-relaxed mb-4">
              If you witness or experience unacceptable behavior, please report it immediately:
            </p>
            <div className="space-y-2 text-white">
              <p><strong>Email:</strong> conduct@shivneri.com</p>
              <p><strong>Confidential Hotline:</strong> +91 12345 67890</p>
              <p><strong>HR Department:</strong> hr@shivneri.com</p>
            </div>
            <p className="text-white leading-relaxed mt-4">
              All reports will be handled confidentially and investigated promptly. We will take appropriate action to address any violations of this Code of Conduct.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Consequences</h2>
            <p className="text-white leading-relaxed">
              Individuals found to be in violation of this Code of Conduct may face consequences ranging from a warning to immediate termination of employment or business relationships, depending on the severity and nature of the violation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Scope</h2>
            <p className="text-white leading-relaxed">
              This Code of Conduct applies to all employees, contractors, clients, partners, and anyone participating in Shivneri's activities, both online and offline, including but not limited to meetings, conferences, and digital communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-white">
              For questions about this Code of Conduct, please contact us at conduct@shivneri.com
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
