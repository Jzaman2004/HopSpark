import { useEffect, useState } from 'react';
import { RotateCcw, Home, Download, Leaf, DollarSign } from 'lucide-react';

function ResultsDisplay({ results, onStartOver, onRegenerate }) {
  if (!results) return null;

  const { imageUrl, products, analysis, imageStatus } = results;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // For base64 data URLs, they load instantly - no loading needed
    if (imageUrl && imageUrl.startsWith('data:')) {
      setImageLoaded(true);
      setImageError(false);
    } else {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [imageUrl]);

  return (
    <div className="space-y-8">
      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onRegenerate}
          className="magical-button"
        >
          <RotateCcw className="w-5 h-5" />
          Regenerate Image
        </button>
        <button
          onClick={onStartOver}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full border border-magic-gold/30 
                   transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Start Over
        </button>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Generated image */}
        <div className="magical-card">
          <h2 className="font-serif text-2xl mb-4 text-magic-gold flex items-center gap-2">
            <span>✨</span>
            Your Magical Look
          </h2>
          
          {imageUrl ? (
            <div className="relative group">
              <img
                src={imageUrl}
                alt="Generated cosplay preview"
                className="w-full rounded-lg shadow-2xl"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-magic-purple/40 backdrop-blur-sm">
                  <p className="text-magic-cream/80">Loading image...</p>
                </div>
              )}
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-red-500/20">
                  <p className="text-red-200">Image failed to load</p>
                </div>
              )}
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = imageUrl;
                  link.download = 'hopspark-cosplay.png';
                  link.click();
                }}
                className="absolute top-4 right-4 bg-magic-purple/80 hover:bg-magic-purple 
                         p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Download image"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="bg-magic-purple/20 rounded-lg aspect-square flex items-center justify-center">
              <p className="text-magic-cream/60">No image generated</p>
            </div>
          )}

          {imageStatus === 'placeholder' && (
            <div className="mt-3 text-sm text-magic-cream/70">
              Using placeholder image. Check your Dedalus API key and URL.
            </div>
          )}

          {/* Analysis */}
          {analysis && (
            <div className="mt-4 p-4 bg-magic-purple/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-magic-gold">Style Analysis</h3>
              <div className="text-sm space-y-1 text-magic-cream/80">
                {analysis.colors && (
                  <p><strong>Colors:</strong> {analysis.colors.join(', ')}</p>
                )}
                {analysis.theme && (
                  <p><strong>Theme:</strong> {analysis.theme}</p>
                )}
                {analysis.aesthetic && (
                  <p><strong>Aesthetic:</strong> {analysis.aesthetic}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Shopping list */}
        <div className="magical-card">
          <h2 className="font-serif text-2xl mb-4 text-magic-gold flex items-center gap-2">
            <span>🛍️</span>
            Your Shopping List
          </h2>

          {products && products.length > 0 ? (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-magic-purple/20 rounded-lg p-4 hover:bg-magic-purple/30 transition-all border border-magic-gold/20"
                >
                  <div className="flex gap-4">
                    {/* Product image */}
                    {product.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Product details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-magic-cream mb-1 truncate">
                        {product.name}
                      </h3>
                      
                      <p className="text-xs text-magic-cream/60 mb-2">
                        {product.category}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="text-magic-gold font-semibold">
                          ${product.price.toFixed(2)}
                        </span>
                        
                        {product.sustainable && (
                          <span className="px-2 py-1 bg-magic-green/30 text-green-200 text-xs rounded-full flex items-center gap-1">
                            <Leaf className="w-3 h-3" />
                            Eco-Friendly
                          </span>
                        )}
                        
                        {product.priceTier === 'budget' && (
                          <span className="px-2 py-1 bg-magic-gold/30 text-magic-gold text-xs rounded-full flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            Budget Pick
                          </span>
                        )}
                      </div>

                      <a
                        href={product.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-magic-cream/60 hover:text-magic-gold transition-colors"
                      >
                        View on {product.store} →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-magic-cream/60 text-center py-8">
              No products found for this description.
            </p>
          )}

          {/* Total */}
          {products && products.length > 0 && (
            <div className="mt-6 pt-4 border-t border-magic-gold/20">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-magic-cream">
                  Estimated Total:
                </span>
                <span className="text-2xl font-bold text-magic-gold">
                  ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-magic-cream/60 mt-2">
                Prices are estimates and may vary by retailer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;
