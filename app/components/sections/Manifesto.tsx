export default function QuoteHero() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image - Right Side */}
      <div className="absolute left-0 md:-left-100 top-0 w-full md:w-auto opacity-20 md:opacity-30">
        <img
          src="/assets/images/68e3caaa1e0d3deccf973f65_67867867.svg" // Add your image source here
          alt="Background"
          className="w-full h-full object-cover contrast-125"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="max-w-6xl">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tight">
            <span className="block">"It's not just how</span>
            <span className="block">we work. It's who</span>
            <span className="block">we are."</span>
          </h1>
        </div>
      </div>
    </div>
  );
}