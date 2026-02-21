import { Sparkles, Wand2 } from 'lucide-react';

function Hero() {
  return (
    <div className="relative overflow-hidden py-16 px-4">
      {/* Animated background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-magic-gold/30 sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            ✨
          </div>
        ))}
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        {/* Logo/Title */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl animate-hop">🐰</span>
          <h1 className="font-serif text-6xl md:text-7xl font-bold bg-gradient-to-r from-magic-gold via-magic-pink to-magic-gold bg-clip-text text-transparent">
            HopSpark
          </h1>
          <Sparkles className="text-magic-gold w-12 h-12 animate-sparkle" />
        </div>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl text-magic-cream/90 mb-4 font-light">
          Transform into your magical bunny self
        </p>
        
        {/* Description */}
        <p className="text-magic-cream/70 max-w-2xl mx-auto mb-8">
          Describe your dream magical bunny cosplay, and our AI will conjure a personalized 
          shopping list and preview image just for you. ✨
        </p>
        
        {/* Features badges */}
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-4 py-2 bg-magic-purple/30 rounded-full border border-magic-gold/30 backdrop-blur-sm">
            <Wand2 className="inline w-4 h-4 mr-1" />
            AI-Powered
          </span>
          <span className="px-4 py-2 bg-magic-purple/30 rounded-full border border-magic-gold/30 backdrop-blur-sm">
            🌱 Eco-Friendly Options
          </span>
          <span className="px-4 py-2 bg-magic-purple/30 rounded-full border border-magic-gold/30 backdrop-blur-sm">
            💰 All Budgets Welcome
          </span>
        </div>
      </div>
    </div>
  );
}

export default Hero;
