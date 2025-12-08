import React from 'react';

export default function SecuritySection() {
  const features = [
    {
      title: "Shift Left",
      description: "Automated scanning, secret detection, and secure coding practices from day one.",
      bgColor: "bg-gray-100"
    },
    {
      title: "CI/CD Security",
      description: "Credential management, approval gates, static & dynamic tests, secrets scanning",
      bgColor: "bg-gray-200"
    },
    {
      title: "Infrastructure as Code",
      description: "Least-privilege defaults, logging, tagging, and hardened environments via Terraform.",
      bgColor: "bg-gray-300"
    },
    {
      title: "Platform Architecture",
      description: "Best practices design security",
      bgColor: "bg-gray-400"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white py-16 px-6 rounded-4xl">
      <div className="">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <button className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-600 text-sm hover:border-gray-400 transition-colors">
              How We Approach Security
            </button>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
            Security Built In.<br />
            Never Bolted On.
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We embed security at every layer—users, code,<br />
            pipelines, and infrastructure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} p-16 md:p-20 text-center min-h-[280px] flex flex-col justify-center`}>
                <h3 className="text-2xl md:text-3xl font-normal text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <button className="bg-black text-white px-8 py-4 rounded-full text-base hover:bg-gray-800 transition-colors whitespace-nowrap">
                How We Approach Security
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}