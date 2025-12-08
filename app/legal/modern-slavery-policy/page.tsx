import React from 'react';

export default function ModernSlaveryPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 pt-50">
        <h1 className="text-4xl font-bold mb-8">Modern Slavery Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <p className="text-white leading-relaxed">
              Shivneri is committed to preventing modern slavery and human trafficking in all its forms within our business and supply chains. We have a zero-tolerance approach to modern slavery and are dedicated to acting ethically and with integrity in all our business relationships.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Understanding Modern Slavery</h2>
            <p className="text-white leading-relaxed mb-4">
              Modern slavery encompasses:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>Slavery, servitude, and forced or compulsory labor</li>
              <li>Human trafficking for labor or sexual exploitation</li>
              <li>Child labor and exploitation</li>
              <li>Debt bondage and other forms of exploitation</li>
              <li>Forced marriage and other practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Policies and Procedures</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Due Diligence</h3>
                <p className="text-white">We conduct thorough due diligence on all suppliers and business partners to ensure they share our commitment to eradicating modern slavery.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Risk Assessment</h3>
                <p className="text-white">We regularly assess and identify risks of modern slavery within our operations and supply chains, implementing appropriate mitigation measures.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Supplier Code of Conduct</h3>
                <p className="text-white">All suppliers must adhere to our Supplier Code of Conduct, which explicitly prohibits modern slavery and human trafficking.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Employee Rights and Welfare</h2>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>All employees have the right to freely choose employment</li>
              <li>We provide fair wages and working conditions</li>
              <li>No employee is required to surrender identity documents</li>
              <li>We respect freedom of association and collective bargaining</li>
              <li>All employment is voluntary with appropriate notice periods</li>
              <li>We maintain safe and healthy working environments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Supply Chain Management</h2>
            <p className="text-white leading-relaxed mb-4">
              We are committed to responsible supply chain management:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>Mapping our supply chains to identify potential risks</li>
              <li>Conducting regular audits and assessments of suppliers</li>
              <li>Requiring suppliers to certify compliance with anti-slavery laws</li>
              <li>Providing training to suppliers on modern slavery prevention</li>
              <li>Terminating relationships with suppliers who violate our policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Training and Awareness</h2>
            <p className="text-white leading-relaxed">
              We provide comprehensive training to our employees to help them identify and respond to risks of modern slavery. This includes understanding the signs of exploitation, knowing how to report concerns, and understanding their responsibilities under this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Reporting Mechanisms</h2>
            <p className="text-white leading-relaxed mb-4">
              We encourage anyone with concerns about modern slavery to report them:
            </p>
            <div className="space-y-2 text-white">
              <p><strong>Confidential Hotline:</strong> +91 12345 67890</p>
              <p><strong>Email:</strong> ethics@shivneri.com</p>
              <p><strong>HR Department:</strong> hr@shivneri.com</p>
            </div>
            <p className="text-white leading-relaxed mt-4">
              All reports will be investigated promptly and confidentially. We have a no-retaliation policy for those who report concerns in good faith.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Monitoring and Review</h2>
            <p className="text-white leading-relaxed">
              We regularly monitor the effectiveness of our anti-slavery policies and procedures. This policy is reviewed annually and updated as necessary to ensure it remains effective and relevant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Legal Compliance</h2>
            <p className="text-white leading-relaxed">
              We comply with all applicable anti-slavery and human trafficking laws, including the Modern Slavery Act 2015 (UK) and similar legislation in other jurisdictions where we operate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Board Responsibility</h2>
            <p className="text-white leading-relaxed">
              The Board of Directors has ultimate responsibility for ensuring this policy is implemented effectively and that Shivneri fulfills its obligations regarding modern slavery prevention.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-white">
              For questions about our Modern Slavery Policy, please contact us at ethics@shivneri.com
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
