import { useState } from 'react';
import { Sparkles, DollarSign } from 'lucide-react';

const EXAMPLE_PROMPTS = [
  "Elegant white bunny witch with purple robes, silver moon staff, and starlight accessories",
  "Steampunk rabbit wizard with brass goggles, leather vest, mechanical ears, and copper wand",
  "Pastel goth bunny sorcerer with black lace, purple crystals, platform boots, and mystical makeup",
  "Forest fairy bunny with green flowing robes, flower crown, wooden staff, and nature accessories"
];

function CosplayInput({ onGenerate, error }) {
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('mid');
  const [aesthetic, setAesthetic] = useState('cute');
  const [complexity, setComplexity] = useState('simple');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    onGenerate(description, {
      budget,
      aesthetic,
      complexity
    });
  };

  const handleExampleClick = (example) => {
    setDescription(example);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="magical-card">
        <h2 className="font-serif text-3xl mb-6 text-center text-magic-gold">
          Describe Your Dream Cosplay
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main text input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-magic-cream">
              What magical bunny cosplay do you envision?
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="I want to be a pastel goth bunny witch with black lace ears, purple fishnet sleeves, a short black skirt with purple trim, platform boots, and a crystal pentagram wand..."
              rows={5}
              className="w-full px-4 py-3 bg-white/5 border border-magic-gold/30 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-magic-gold text-white placeholder-magic-cream/40
                       resize-none"
              required
            />
          </div>

          {/* Budget slider */}
          <div>
            <label className="block text-sm font-medium mb-3 text-magic-cream">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Budget: <span className="text-magic-gold">{budget === 'budget' ? 'Budget-Friendly' : budget === 'mid' ? 'Mid-Range' : 'Premium'}</span>
            </label>
            <input
              type="range"
              min="0"
              max="2"
              value={budget === 'budget' ? 0 : budget === 'mid' ? 1 : 2}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setBudget(val === 0 ? 'budget' : val === 1 ? 'mid' : 'premium');
              }}
              className="w-full h-2 bg-magic-purple/30 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-magic-gold
                       [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-magic-cream/60 mt-1">
              <span>$</span>
              <span>$$</span>
              <span>$$$</span>
            </div>
          </div>

          {/* Aesthetic slider */}
          <div>
            <label className="block text-sm font-medium mb-3 text-magic-cream">
              Magic Style: <span className="text-magic-gold">{aesthetic === 'cute' ? 'Cute' : aesthetic === 'balanced' ? 'Balanced' : 'Dark/Mysterious'}</span>
            </label>
            <input
              type="range"
              min="0"
              max="2"
              value={aesthetic === 'cute' ? 0 : aesthetic === 'balanced' ? 1 : 2}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setAesthetic(val === 0 ? 'cute' : val === 1 ? 'balanced' : 'dark');
              }}
              className="w-full h-2 bg-magic-purple/30 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-magic-gold
                       [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-magic-cream/60 mt-1">
              <span>✨ Cute</span>
              <span>⚖️ Balanced</span>
              <span>🌙 Dark</span>
            </div>
          </div>

          {/* Complexity slider */}
          <div>
            <label className="block text-sm font-medium mb-3 text-magic-cream">
              Complexity: <span className="text-magic-gold">{complexity === 'simple' ? 'Simple' : complexity === 'moderate' ? 'Moderate' : 'Elaborate'}</span>
            </label>
            <input
              type="range"
              min="0"
              max="2"
              value={complexity === 'simple' ? 0 : complexity === 'moderate' ? 1 : 2}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setComplexity(val === 0 ? 'simple' : val === 1 ? 'moderate' : 'elaborate');
              }}
              className="w-full h-2 bg-magic-purple/30 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-magic-gold
                       [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-magic-cream/60 mt-1">
              <span>Simple</span>
              <span>Moderate</span>
              <span>Elaborate</span>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={!description.trim()}
            className="magical-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5" />
            Conjure My Look
          </button>
        </form>

        {/* Example prompts */}
        <div className="mt-8 pt-6 border-t border-magic-gold/20">
          <p className="text-sm text-magic-cream/70 mb-3 text-center">
            Need inspiration? Try these examples:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {EXAMPLE_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleExampleClick(prompt)}
                className="text-left text-sm p-3 bg-magic-purple/20 hover:bg-magic-purple/30 
                         rounded-lg border border-magic-gold/20 hover:border-magic-gold/40 
                         transition-all text-magic-cream/80 hover:text-magic-cream"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CosplayInput;
