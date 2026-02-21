import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mockProducts = JSON.parse(readFileSync(join(__dirname, '../data/mockProducts.json'), 'utf-8'));

export function findMatchingProducts(cosplayData, searchQueries, options) {
  const { budget } = options;
  
  // Combine all search criteria
  const allKeywords = [
    ...cosplayData.colors,
    ...cosplayData.costumePieces,
    ...cosplayData.keywords,
    ...searchQueries,
    cosplayData.aesthetic,
    cosplayData.magicTheme
  ].map(k => k.toLowerCase());

  // Score each product
  const scoredProducts = mockProducts.map(product => {
    let score = 0;
    
    // Check tags for matches
    product.tags.forEach(tag => {
      allKeywords.forEach(keyword => {
        if (tag.includes(keyword) || keyword.includes(tag)) {
          score += 2;
        }
      });
    });
    
    // Check category and name
    allKeywords.forEach(keyword => {
      if (product.category.toLowerCase().includes(keyword)) score += 1;
      if (product.name.toLowerCase().includes(keyword)) score += 1;
    });
    
    // Budget preference
    if (budget === 'budget' && product.priceTier === 'budget') score += 3;
    if (budget === 'mid' && product.priceTier === 'mid') score += 2;
    if (budget === 'premium' && product.priceTier === 'premium') score += 3;
    
    // Bonus for sustainable
    if (product.sustainable) score += 1;
    
    return { ...product, score };
  });

  // Sort by score and return top matches
  return scoredProducts
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ score, ...product }) => ({
      ...product,
      url: `https://www.${product.store.toLowerCase()}.com/search?q=${encodeURIComponent(product.name)}`
    }));
}
