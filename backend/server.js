import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeCosplayDescription, generateDallePrompt, generateProductSearchQueries } from './services/groqService.js';
import { generateCosplayImage } from './services/dedalusService.js';
import { findMatchingProducts } from './services/productService.js';

// Load environment variables
dotenv.config({ path: '../.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HopSpark API is running' });
});

// Main generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { description, options } = req.body;
    
    if (!description || !description.trim()) {
      return res.status(400).json({ error: 'Description is required' });
    }

    console.log('🐰 Starting cosplay generation...');
    console.log('Description:', description);
    console.log('Options:', options);

    // Step 1: Analyze the description using Groq
    console.log('Step 1: Analyzing description...');
    const analysis = await analyzeCosplayDescription(description, options);
    console.log('Analysis result:', analysis);

    // Step 2: Generate search queries
    console.log('Step 2: Generating search queries...');
    const searchQueries = await generateProductSearchQueries(analysis);
    console.log('Search queries:', searchQueries);

    // Step 3: Find matching products
    console.log('Step 3: Finding products...');
    const products = findMatchingProducts(analysis, searchQueries, options);
    console.log(`Found ${products.length} products`);

    // Step 4: Generate DALL-E prompt
    console.log('Step 4: Generating image prompt...');
    const imagePrompt = await generateDallePrompt(analysis, description);
    console.log('Image prompt:', imagePrompt);

    // Step 5: Generate image
    console.log('Step 5: Generating image...');
    const imageUrl = await generateCosplayImage(imagePrompt);
    console.log('Image generated:', imageUrl ? 'success' : 'failed');

    // Return results
    const results = {
      analysis,
      products,
      imageUrl,
      imagePrompt
    };

    console.log('✅ Generation complete!');
    res.json(results);
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate cosplay',
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🐰✨ HopSpark API running on http://localhost:${PORT}`);
  const groqKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  const dedalusKey = process.env.DEDALUS_API_KEY || process.env.VITE_DEDALUS_API_KEY;
  console.log(`Environment check:
    - Groq API Key: ${groqKey ? '✅ Set' : '❌ Missing'}
    - Dedalus API Key: ${dedalusKey ? '✅ Set' : '❌ Missing'}
  `);
});
