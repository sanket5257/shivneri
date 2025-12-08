import React from 'react';

export default function SustainabilityPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 pt-50">
        <h1 className="text-4xl font-bold mb-8">Sustainability Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to Sustainability</h2>
            <p className="text-white leading-relaxed">
              At Shivneri, we are committed to conducting our business in an environmentally responsible and sustainable manner. We recognize our responsibility to minimize our environmental impact and contribute to a sustainable future for our planet and communities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Environmental Stewardship</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Carbon Footprint Reduction</h3>
                <p className="text-white">We actively work to reduce our carbon emissions through energy-efficient practices, remote work policies, and sustainable transportation options.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Renewable Energy</h3>
                <p className="text-white">We prioritize the use of renewable energy sources in our operations and encourage our partners to do the same.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Waste Reduction</h3>
                <p className="text-white">We implement comprehensive recycling programs and minimize waste through digital-first operations and responsible procurement.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Sustainable Business Practices</h2>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>Prioritize cloud services providers with green energy commitments</li>
              <li>Optimize code and infrastructure for energy efficiency</li>
              <li>Implement sustainable procurement policies</li>
              <li>Encourage remote work to reduce commuting emissions</li>
              <li>Use digital documentation to minimize paper waste</li>
              <li>Partner with environmentally responsible suppliers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Green Technology Solutions</h2>
            <p className="text-white leading-relaxed mb-4">
              We help our clients achieve their sustainability goals through:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>Cloud optimization to reduce energy consumption</li>
              <li>Efficient algorithm design for lower computational requirements</li>
              <li>Digital transformation to replace paper-based processes</li>
              <li>IoT solutions for energy monitoring and optimization</li>
              <li>Sustainable architecture design and consulting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Social Responsibility</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Community Engagement</h3>
                <p className="text-white">We actively participate in community initiatives and support local environmental programs and education.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Employee Well-being</h3>
                <p className="text-white">We foster a healthy work environment that promotes work-life balance and employee wellness.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Education and Awareness</h3>
                <p className="text-white">We provide sustainability training and awareness programs for our employees and clients.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Monitoring and Reporting</h2>
            <p className="text-white leading-relaxed">
              We regularly monitor and report on our sustainability performance, including energy consumption, carbon emissions, and waste reduction metrics. We set annual targets and continuously improve our practices based on measured results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Compliance and Standards</h2>
            <p className="text-white leading-relaxed">
              We comply with all applicable environmental laws and regulations and strive to exceed industry standards. We regularly review and update our sustainability practices to align with global best practices and emerging technologies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Continuous Improvement</h2>
            <p className="text-white leading-relaxed">
              We are committed to continuous improvement in our sustainability performance. We regularly assess our environmental impact, set ambitious targets, and invest in innovative solutions to advance our sustainability goals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-white">
              For questions about our Sustainability Policy, please contact us at sustainability@shivneri.com
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
