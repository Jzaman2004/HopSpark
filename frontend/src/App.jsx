import { useState } from 'react';
import Hero from './components/Hero';
import CosplayInput from './components/CosplayInput';
import LoadingAnimation from './components/LoadingAnimation';
import ResultsDisplay from './components/ResultsDisplay';
import { generateCosplay } from './services/apiService';

function App() {
  const [stage, setStage] = useState('input'); // input, loading, results
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (description, options) => {
    setStage('loading');
    setError(null);
    
    try {
      const data = await generateCosplay(description, options);
      setResults(data);
      setStage('results');
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate cosplay. Please try again.');
      setStage('input');
    }
  };

  const handleStartOver = () => {
    setStage('input');
    setResults(null);
    setError(null);
  };

  const handleRegenerate = async () => {
    if (!results || !results.originalDescription) return;
    
    setStage('loading');
    setError(null);
    
    try {
      const data = await generateCosplay(results.originalDescription, results.originalOptions);
      setResults(data);
      setStage('results');
    } catch (err) {
      console.error('Regeneration error:', err);
      setError(err.message || 'Failed to regenerate cosplay. Please try again.');
      setStage('results');
    }
  };

  return (
    <div className="min-h-screen">
      <Hero />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {stage === 'input' && (
          <CosplayInput onGenerate={handleGenerate} error={error} />
        )}
        
        {stage === 'loading' && (
          <LoadingAnimation />
        )}
        
        {stage === 'results' && results && (
          <ResultsDisplay 
            results={results} 
            onStartOver={handleStartOver}
            onRegenerate={handleRegenerate}
          />
        )}
      </main>
      
      <footer className="text-center py-8 text-magic-cream/60 text-sm">
        <p>Made with ✨ magic and 🐰 love for HopperHacks 2026</p>
      </footer>
    </div>
  );
}

export default App;
