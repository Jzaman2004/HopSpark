import { useEffect, useState } from 'react';

const LOADING_MESSAGES = [
  "Fluffing your bunny ears... 🐰",
  "Casting the Fashionus Charm... ✨",
  "Hopping through the multiverse... 🌟",
  "Brewing your perfect look... 🧪",
  "Consulting the magic mirror... 🪞",
  "Summoning your costume... 👗",
  "Weaving magical threads... 🧵",
  "Enchanting your wardrobe... ✨"
];

function LoadingAnimation() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 5;
      });
    }, 300);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="magical-card">
        {/* Animated bunny */}
        <div className="text-8xl animate-hop mb-8">
          🐰
        </div>

        {/* Loading message */}
        <h2 className="font-serif text-3xl mb-4 text-magic-gold">
          {LOADING_MESSAGES[messageIndex]}
        </h2>

        {/* Progress bar */}
        <div className="w-full bg-magic-purple/30 rounded-full h-4 mb-8 overflow-hidden">
          <div
            className="bg-gradient-to-r from-magic-purple via-magic-gold to-magic-purple h-full rounded-full transition-all duration-300 animate-pulse"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Sparkles */}
        <div className="flex justify-center gap-4 text-4xl">
          <span className="sparkle" style={{ animationDelay: '0s' }}>✨</span>
          <span className="sparkle" style={{ animationDelay: '0.3s' }}>⭐</span>
          <span className="sparkle" style={{ animationDelay: '0.6s' }}>💫</span>
          <span className="sparkle" style={{ animationDelay: '0.9s' }}>✨</span>
        </div>

        <p className="mt-6 text-magic-cream/60 text-sm">
          This may take 10-15 seconds...
        </p>
      </div>
    </div>
  );
}

export default LoadingAnimation;
