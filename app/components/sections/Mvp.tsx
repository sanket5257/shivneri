export default function MVPCards() {
  const cards = [
    {
      title: "Mission",
      description: "Build, scale, and run great software—fast, secure, and built for what's next.",
      image: "/assets/images/68d105c245053d57199df7a8_Wireframe 33.svg" // Add your image path here
    },
    {
      title: "Vision",
      description: "A world where every team can ship high-performing software without legacy drag or bloated overhead.",
      image: "/assets/images/68d105c245053d57199df7a8_Wireframe 33.svg" // Add your image path here
    },
    {
      title: "Purpose",
      description: "We turn bold ideas into resilient, scalable systems—minus the red tape.",
      image: "/assets/images/68d105c245053d57199df7a8_Wireframe 33.svg" // Add your image path here
    }
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        {/* MVP Badge */}
        <div className="flex justify-center mb-12">
          <span className="px-6 py-2 border border-gray-600 rounded-full text-gray-400 text-sm tracking-wider">
            MVP
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-semibold text-center mb-20 text-neutral-300">
          Mission. Vision. Purpose.
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative bg-neutral-900 rounded-2xl p-8 min-h-[450px] flex flex-col justify-between overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              {/* Background Image */}
              {card.image && (
                <img
                  src={card.image}
                  alt=""
                  className="absolute top-0 right-0 w-48 h-48 object-contain"
                />
              )}

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {card.title}
                </h2>
              </div>

              <p className="relative z-10 text-neutral-400 text-lg leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}