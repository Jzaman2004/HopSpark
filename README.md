# 🐰✨ HopSpark - Magical Bunny Cosplay Generator

![HopSpark](https://img.shields.io/badge/HopSpark-Magical%20Cosplay-4B0082?style=for-the-badge)
![Built for HopperHacks 2026](https://img.shields.io/badge/HopperHacks-2026-FFD700?style=for-the-badge)

Transform into your magical bunny self! HopSpark uses AI to generate personalized cosplay designs and shopping lists based on your dream description.

## ✨ Features

- **AI-Powered Analysis**: Groq API (Llama 3.3-70B) analyzes your cosplay description
- **Image Generation**: Dedalus API (DALL-E 3) creates preview images of your cosplay
- **Smart Shopping Lists**: Curated product recommendations with price estimates
- **Budget-Friendly Options**: Filter by budget tier (budget, mid-range, premium)
- **Eco-Friendly Choices**: Highlights sustainable and handmade products
- **Magical UI**: Beautiful Harry Potter-themed interface with sparkles and animations

## 🎯 Social Good Impact

- **Accessibility**: Makes cosplay accessible to everyone, regardless of crafting skills
- **Inclusivity**: Suggestions for all sizes, budgets, and styles
- **Sustainability**: Flags eco-friendly products and encourages thoughtful shopping
- **Mental Health**: Supports creative self-expression and community building
- **Beginner-Friendly**: Built by beginners, for beginners!

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Groq API key ([Get one free](https://console.groq.com))
- Dedalus API key ([Get one free](https://dedalus.ai))

### Installation

1. **Clone the repository**
   ```bash
   cd /workspaces/HopSpark
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Edit `.env.local`** with your API keys:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   VITE_DEDALUS_API_KEY=your_dedalus_api_key_here
   VITE_USE_REAL_API=true
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This starts:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 📁 Project Structure

```
HopSpark/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Hero.jsx
│   │   │   ├── CosplayInput.jsx
│   │   │   ├── LoadingAnimation.jsx
│   │   │   └── ResultsDisplay.jsx
│   │   ├── services/        # API integration
│   │   │   └── apiService.js
│   │   ├── App.jsx          # Main app component
│   │   ├── index.css        # Tailwind styles
│   │   └── main.jsx         # Entry point
│   └── package.json
├── backend/                  # Express API server
│   ├── services/
│   │   ├── groqService.js   # Llama 3.3-70B integration
│   │   ├── dedalusService.js # DALL-E 3 integration
│   │   └── productService.js # Product matching
│   ├── data/
│   │   └── mockProducts.json # Product database
│   ├── server.js            # Express server
│   └── package.json
├── .env.local.example       # Environment template
└── README.md
```

## 🔑 API Integration Guide

### Groq API (Llama 3.3-70B)

**Purpose**: Natural language processing for cosplay analysis and prompt generation

**How to Get Started**:
1. Sign up at [console.groq.com](https://console.groq.com)
2. Create a new API key (free tier available)
3. Add to `.env.local`:
   ```env
   GROQ_API_KEY=gsk_your_key_here
   VITE_GROQ_API_KEY=gsk_your_key_here
   GROQ_API_URL=https://api.groq.com/openai/v1
   VITE_GROQ_API_URL=https://api.groq.com/openai/v1
   ```

**What It Does**:
- Analyzes cosplay descriptions and extracts structured data
- Identifies colors, costume pieces, themes, and aesthetics
- Generates optimized product search queries
- Creates detailed DALL-E 3 prompts for image generation

**Model Used**: `llama-3.3-70b-versatile`
- Fast inference (< 2 seconds typical)
- High quality text understanding
- JSON-structured outputs

**API Calls Per Request**: 3
1. `analyzeCosplayDescription()` - Extract structured data
2. `generateProductSearchQueries()` - Create search terms
3. `generateDallePrompt()` - Build image generation prompt

**Fallback Behavior**: If API key is missing or invalid:
- Uses keyword-based extraction from description
- Returns basic structured data
- Generates simple fallback prompts

### Dedalus API (DALL-E 3)

**Purpose**: High-quality AI image generation for cosplay previews

**How to Get Started**:
1. Sign up at [dedalus.ai](https://dedalus.ai)
2. Get your API key from dashboard
3. Add to `.env.local`:
   ```env
   DEDALUS_API_KEY=dsk-live-your-key-here
   VITE_DEDALUS_API_KEY=dsk-live-your-key-here
   DEDALUS_API_URL=https://api.dedaluslabs.ai
   VITE_DEDALUS_API_URL=https://api.dedaluslabs.ai
   ```

**What It Does**:
- Generates 1024x1024 HD cosplay concept art
- Returns base64-encoded PNG images
- Processes Llama-generated prompts into visual previews

**Endpoint**: `POST /v1/images/generations`

**Request Format**:
```javascript
{
  prompt: "[Llama-generated detailed prompt]",
  model: "openai/dall-e-3",
  size: "1024x1024",
  quality: "hd",
  response_format: "b64_json",
  n: 1
}
```

**Response Format**:
```javascript
{
  data: [{
    b64_json: "iVBORw0KGgoAAAANS..." // Base64 PNG
  }]
}
```

**Processing Time**: 15-30 seconds typical

**Fallback Behavior**: If API key is missing or rate limit reached:
- Returns 1x1 purple placeholder pixel (base64)
- App still functions, just without generated images
- User sees "placeholder" status in UI

### Environment Variables Reference

**Required for Full Functionality**:
```env
# Backend + Frontend (both needed for hot reload)
GROQ_API_KEY=gsk_your_key_here
VITE_GROQ_API_KEY=gsk_your_key_here
DEDALUS_API_KEY=dsk-live-your-key-here
VITE_DEDALUS_API_KEY=dsk-live-your-key-here
```

**Optional (have defaults)**:
```env
GROQ_API_URL=https://api.groq.com/openai/v1
VITE_GROQ_API_URL=https://api.groq.com/openai/v1
DEDALUS_API_URL=https://api.dedaluslabs.ai
VITE_DEDALUS_API_URL=https://api.dedaluslabs.ai
```

**Why Duplicate Variables?**
- `GROQ_API_KEY` - Used by backend Node.js (server.js)
- `VITE_GROQ_API_KEY` - Exposed to frontend via Vite
- Same pattern for Dedalus keys
- Ensures both environments have access during development

### API Cost Estimates (as of 2026)

**Groq (Llama 3.3-70B)**:
- Free tier: 30 requests/minute
- Typical usage: 3 API calls per cosplay generation
- Cost per generation: ~$0.002 (paid tier)

**Dedalus (DALL-E 3)**:
- Free tier: Limited credits
- HD 1024x1024: ~$0.04 per image
- Cost per generation: ~$0.04

**Total cost per complete generation**: ~$0.042 (with paid APIs)
**Free tier**: ~300-500 generations/month possible

## 🎨 How It Works

### High-Level Flow

1. **User Input**: Describe your dream magical bunny cosplay with customization options
2. **AI Analysis**: Groq/Llama 3.3-70B extracts structured data (colors, themes, costume pieces)
3. **Search Query Generation**: AI creates optimized product search keywords
4. **Product Matching**: Algorithm finds matching items from curated database
5. **Image Prompt Creation**: Llama generates detailed DALL-E 3 prompt
6. **Image Generation**: Dedalus API calls DALL-E 3 with optimized prompt
7. **Results Display**: Shopping list and AI-generated preview shown side-by-side

### Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  (React + Vite + TailwindCSS - Port 5173)                  │
│                                                             │
│  Components:                                                │
│  - CosplayInput.jsx   → User input form                    │
│  - LoadingAnimation.jsx → Processing state                  │
│  - ResultsDisplay.jsx  → Results with image & products     │
│                                                             │
│  Services:                                                  │
│  - apiService.js → HTTP client (Axios)                     │
└──────────────────────────┬──────────────────────────────────┘
                           │ POST /api/generate
                           │ {description, options}
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                      Backend API                            │
│       (Express + Node.js - Port 3001)                       │
│                                                             │
│  Endpoints:                                                 │
│  - POST /api/generate  → Main generation endpoint          │
│  - GET /api/health     → Health check                      │
│                                                             │
│  Services:                                                  │
│  ┌─────────────────────────────────────────┐              │
│  │ groqService.js (Llama 3.3-70B)          │              │
│  │ - analyzeCosplayDescription()            │              │
│  │ - generateDallePrompt()                  │              │
│  │ - generateProductSearchQueries()         │              │
│  └─────────────────────────────────────────┘              │
│                   ↓                                         │
│  ┌─────────────────────────────────────────┐              │
│  │ dedalusService.js (DALL-E 3)            │              │
│  │ - generateCosplayImage()                 │              │
│  │ - base64ToDataUrl()                      │              │
│  └─────────────────────────────────────────┘              │
│                   ↓                                         │
│  ┌─────────────────────────────────────────┐              │
│  │ productService.js                        │              │
│  │ - findMatchingProducts()                 │              │
│  │ - Searches mockProducts.json             │              │
│  └─────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                     External APIs                           │
│                                                             │
│  Groq API (api.groq.com)                                   │
│  - Model: llama-3.3-70b-versatile                          │
│  - Used for: NLP analysis, prompt generation                │
│                                                             │
│  Dedalus API (api.dedaluslabs.ai)                          │
│  - Model: openai/dall-e-3                                  │
│  - Used for: Image generation (1024x1024, HD quality)      │
│  - Returns: Base64-encoded PNG images                       │
└─────────────────────────────────────────────────────────────┘
```

### Detailed Processing Steps

#### Step 1: Description Analysis
```javascript
// groqService.js → analyzeCosplayDescription()
Input: "Elegant white bunny witch with purple robes and moon staff"
Options: {budget: "mid", aesthetic: "cute", complexity: "simple"}

Llama 3.3-70B extracts:
{
  colors: ["white", "purple"],
  costumePieces: ["robes", "ears", "staff"],
  magicTheme: "witch",
  bunnyElements: ["ears"],
  aesthetic: "elegant",
  keywords: ["magical", "mystical", "moon"]
}
```

#### Step 2: Product Search Query Generation
```javascript
// groqService.js → generateProductSearchQueries()
Input: Analysis object from Step 1

Llama generates optimized search terms:
["white bunny ears", "purple wizard robe", "moon staff wand", 
 "elegant witch costume", "mystical accessories"]
```

#### Step 3: Product Matching
```javascript
// productService.js → findMatchingProducts()
- Searches mockProducts.json (25 curated items)
- Matches by keywords, colors, categories
- Filters by budget tier
- Prioritizes sustainable/eco-friendly options
- Returns 8 best matches with prices
```

#### Step 4: DALL-E Prompt Generation
```javascript
// groqService.js → generateDallePrompt()
Input: Analysis object + original description

Llama 3.3-70B creates detailed image prompt:
"A whimsical full-body concept art illustration of an elegant bunny 
witch character wearing flowing white and purple robes with a moon 
crystal staff. The character has cute white bunny ears integrated 
naturally into the magical costume. Mystical atmosphere with sparkles, 
moonlight glow, and enchanted energy. Professional digital art style, 
fantasy character design, magical and enchanting mood. NOT a photograph, 
but a stylized cosplay concept illustration."
```

#### Step 5: Image Generation
```javascript
// dedalusService.js → generateCosplayImage()
Dedalus API Request:
{
  prompt: [Llama-generated prompt from Step 4],
  model: "openai/dall-e-3",
  size: "1024x1024",
  quality: "hd",
  response_format: "b64_json",
  n: 1
}

Response: Base64-encoded PNG image
Conversion: base64ToDataUrl() → data:image/png;base64,...
```

#### Step 6: Results Assembly
```javascript
// server.js → /api/generate endpoint
Returns:
{
  analysis: {...},          // Extracted style data
  products: [...],          // 8 matching products
  imageUrl: "data:image/png;base64,...",  // Generated image
  imagePrompt: "...",       // The prompt used
  imageStatus: "generated", // "generated" | "placeholder" | "missing"
  originalDescription: "...",
  originalOptions: {...}
}
```

### Image Generation Flow (COSPLAYFORGE Pattern)

This implementation uses the proven pattern from COSPLAYFORGE:

```javascript
// 1. Llama generates the perfect DALL-E prompt
const imagePrompt = await generateDallePrompt(analysis, description);

// 2. Dedalus calls DALL-E 3 and returns base64
const base64Image = await generateCosplayImage(imagePrompt);

// 3. Convert base64 to data URL for browser
const imageUrl = base64ToDataUrl(base64Image);

// 4. Frontend displays the data URL directly (instant load)
<img src={imageUrl} />
```

**Why this pattern works**:
- ✅ Base64 data URLs load instantly (no download time)
- ✅ No external image hosting needed
- ✅ Images persist in browser during session
- ✅ Consistent handling between development and production

### Example Complete Flow

```
User Input:
  "Elegant white bunny witch with purple robes and moon staff"
  Budget: Mid-range | Aesthetic: Cute | Complexity: Simple

↓ [POST /api/generate]

Step 1 - Groq Analysis:
  {colors: ["white", "purple"], theme: "witch", ...}

Step 2 - Groq Search Queries:
  ["white bunny ears", "purple wizard robe", "moon staff", ...]

Step 3 - Product Matching:
  → 8 products found, total: ~$150

Step 4 - Groq Prompt Generation:
  "A whimsical full-body concept art illustration of..."

Step 5 - Dedalus Image Generation:
  → 1024x1024 HD image (base64)

Step 6 - Frontend Display:
  ✨ Shopping list (left) + Preview image (right)
```

## 🛠️ Development

### Project Structure Explained

```
HopSpark/
├── frontend/                          # React frontend (Port 5173)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx              # Landing page header with sparkles
│   │   │   ├── CosplayInput.jsx      # Main form: description + sliders
│   │   │   ├── LoadingAnimation.jsx   # Animated loading state
│   │   │   └── ResultsDisplay.jsx    # Split view: image + products
│   │   ├── services/
│   │   │   └── apiService.js         # HTTP client (Axios)
│   │   ├── App.jsx                   # Main app: state + routing logic
│   │   ├── index.css                 # Tailwind + custom magical styles
│   │   └── main.jsx                  # React entry point
│   ├── index.html                    # HTML template
│   ├── vite.config.js                # Vite config with proxy to backend
│   ├── tailwind.config.js            # Custom colors (magic-purple, etc.)
│   └── package.json                  # Frontend dependencies
│
├── backend/                           # Express API (Port 3001)
│   ├── services/
│   │   ├── groqService.js            # 🧠 Llama 3.3-70B integration
│   │   │   ├── analyzeCosplayDescription()    # Extract structured data
│   │   │   ├── generateDallePrompt()          # Create image prompt
│   │   │   ├── generateProductSearchQueries() # Search keywords
│   │   │   └── Fallback functions when API unavailable
│   │   │
│   │   ├── dedalusService.js         # 🎨 DALL-E 3 integration
│   │   │   ├── generateCosplayImage()         # Call Dedalus API
│   │   │   ├── base64ToDataUrl()              # Convert to data URL
│   │   │   └── Placeholder fallback (1x1 purple pixel)
│   │   │
│   │   └── productService.js         # 🛍️ Product matching logic
│   │       ├── findMatchingProducts()         # Search mock database
│   │       └── Scoring algorithm (keywords, budget, sustainability)
│   │
│   ├── data/
│   │   └── mockProducts.json         # 25 curated cosplay products
│   │       └── {id, name, category, price, priceTier, keywords, ...}
│   │
│   ├── server.js                     # 🚀 Express server + main endpoint
│   │   ├── POST /api/generate        # Main generation flow
│   │   └── GET /api/health           # Health check
│   │
│   └── package.json                  # Backend dependencies
│
├── .env.local                        # 🔑 Your API keys (git-ignored)
├── .env.local.example                # Template for API keys
├── package.json                      # Root package.json with scripts
└── README.md                         # This file
```

### Key Files Deep Dive

#### `backend/server.js` - Main API Orchestration
```javascript
// Load environment variables FIRST
dotenv.config({ path: join(__dirname, '../.env.local') });

// Main generation endpoint
app.post('/api/generate', async (req, res) => {
  const { description, options } = req.body;
  
  // Step 1: Analyze description with Llama
  const analysis = await analyzeCosplayDescription(description, options);
  
  // Step 2: Generate search queries with Llama
  const searchQueries = await generateProductSearchQueries(analysis);
  
  // Step 3: Find matching products
  const products = findMatchingProducts(analysis, searchQueries, options);
  
  // Step 4: Generate DALL-E prompt with Llama
  const imagePrompt = await generateDallePrompt(analysis, description);
  
  // Step 5: Generate image with DALL-E via Dedalus
  const base64Image = await generateCosplayImage(imagePrompt);
  const imageUrl = base64ToDataUrl(base64Image);
  
  // Step 6: Return everything
  res.json({ analysis, products, imageUrl, imagePrompt, imageStatus });
});
```

#### `backend/services/groqService.js` - Llama Integration
```javascript
// Uses Groq SDK for Llama 3.3-70B
import Groq from 'groq-sdk';

// Three main functions:
1. analyzeCosplayDescription(description, options)
   → Returns: {colors, costumePieces, magicTheme, aesthetic, keywords}

2. generateDallePrompt(cosplayData, description)
   → Returns: Detailed prompt string for DALL-E

3. generateProductSearchQueries(cosplayData)
   → Returns: Array of search keywords

// Includes fallback logic for missing API keys
```

#### `backend/services/dedalusService.js` - DALL-E Integration
```javascript
// Uses Fetch API for Dedalus gateway to DALL-E 3

export async function generateCosplayImage(prompt) {
  const response = await fetch(`${baseUrl}/v1/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      model: 'openai/dall-e-3',
      size: '1024x1024',
      quality: 'hd',
      response_format: 'b64_json',
      n: 1
    })
  });
  
  const data = await response.json();
  return data.data[0].b64_json;  // Returns base64 string
}

export function base64ToDataUrl(base64Data) {
  return `data:image/png;base64,${base64Data}`;
}
```

#### `frontend/src/components/ResultsDisplay.jsx` - Results UI
```javascript
// Key feature: Instant image load detection for base64 data URLs
useEffect(() => {
  // Base64 data URLs load instantly - no loading needed
  if (imageUrl && imageUrl.startsWith('data:')) {
    setImageLoaded(true);
    setImageError(false);
  } else {
    setImageLoaded(false);
    setImageError(false);
  }
}, [imageUrl]);

// Split layout: Image (left) + Products (right)
<div className="grid lg:grid-cols-2 gap-8">
  <div>{/* Image with download button */}</div>
  <div>{/* Scrollable product list */}</div>
</div>
```

#### `frontend/src/App.jsx` - State Management
```javascript
// Simple three-stage state machine
const [stage, setStage] = useState('input'); // input, loading, results
const [results, setResults] = useState(null);
const [error, setError] = useState(null);

// Main handler
const handleGenerate = async (description, options) => {
  setStage('loading');
  const data = await generateCosplay(description, options);  // API call
  setResults(data);
  setStage('results');
};
```

### Run Commands

```bash
# Install all dependencies (frontend + backend)
npm run install:all

# Start both servers concurrently
npm run dev

# Start frontend only (Vite dev server)
npm run dev:frontend

# Start backend only (Node with --watch)
npm run dev:backend

# Build frontend for production
cd frontend && npm run build

# Preview production build
cd frontend && npm run preview
```

### Development Workflow

1. **Start both servers**: `npm run dev`
   - Frontend: http://localhost:5173 (hot reload enabled)
   - Backend: http://localhost:3001 (auto-restart on file changes)

2. **Make changes**:
   - Frontend changes → Auto-reload in browser
   - Backend changes → Server auto-restarts
   - No manual restart needed during development

3. **Check logs**:
   - Frontend: Browser console (F12)
   - Backend: Terminal output (shows API calls, timings)

4. **Test API directly**:
   ```bash
   curl -X POST http://localhost:3001/api/generate \
     -H "Content-Type: application/json" \
     -d '{"description": "purple bunny wizard", "options": {}}'
   ```

### Adding New Products

Edit `backend/data/mockProducts.json`:
```json
{
  "id": 26,
  "name": "Sparkly Bunny Tail",
  "category": "Accessories",
  "price": 12.99,
  "priceTier": "budget",
  "store": "Amazon",
  "url": "https://amazon.com/...",
  "keywords": ["tail", "bunny", "fluffy", "white"],
  "colors": ["white"],
  "sustainable": false,
  "image": "https://via.placeholder.com/300"
}
```

**Tips**:
- Use descriptive keywords for better matching
- Set appropriate `priceTier`: `"budget"`, `"mid"`, or `"premium"`
- Mark eco-friendly items with `"sustainable": true`
- Add direct purchase URLs for real products

## 🎭 Usage Examples

### Example 1: Pastel Goth Bunny
```
Description: "Pastel goth bunny witch with black lace ears, purple fishnet sleeves, 
short black skirt with purple trim, platform boots, and crystal pentagram wand"

Budget: Mid-range
Aesthetic: Dark
Complexity: Moderate

Result: ~$180 estimated total, 8 product suggestions
```

### Example 2: Steampunk Rabbit
```
Description: "Steampunk rabbit inventor with brown leather corset, brass goggles, 
mechanical bunny ears with gears, tool belt, Victorian pants"

Budget: Budget-friendly
Aesthetic: Balanced
Complexity: Elaborate

Result: ~$140 estimated total, 8 product suggestions
```

### Example 3: Elegant Enchantress
```
Description: "Elegant white bunny enchantress with flowing robes in cream and gold, 
pearl bunny ears, moon crystal staff, fairy-tale aesthetic"

Budget: Premium
Aesthetic: Cute
Complexity: Simple

Result: ~$220 estimated total, 8 product suggestions
```

## 🐛 Troubleshooting

### API Keys Not Working

**Symptoms**: 
- Backend logs show "❌ Missing" for API keys
- Placeholder images instead of generated ones
- Fallback analysis instead of AI analysis

**Solutions**:
1. ✅ Verify `.env.local` is in **root directory** (not in frontend/ or backend/)
2. ✅ Check file has both regular AND `VITE_` prefixed keys:
   ```env
   GROQ_API_KEY=gsk_...
   VITE_GROQ_API_KEY=gsk_...
   DEDALUS_API_KEY=dsk-live-...
   VITE_DEDALUS_API_KEY=dsk-live-...
   ```
3. ✅ No extra spaces or quotes around values
4. ✅ Restart BOTH servers after changing `.env.local`
5. ✅ Check backend startup logs for "✅ Set" confirmation

**Verification**:
```bash
# Backend should show:
🐰✨ HopSpark API running on http://localhost:3001
Environment check:
    - Groq API Key: ✅ Set
    - Dedalus API Key: ✅ Set
```

### Image Generation Failing

**Symptoms**:
- Seeing "Loading image..." overlay forever
- Getting placeholder (purple pixel) images
- `imageStatus: "placeholder"` in response

**Causes & Solutions**:

1. **Dedalus API Key Invalid**
   - Check key format: should start with `dsk-live-`
   - Verify key hasn't expired in Dedalus dashboard
   - Test key with curl:
     ```bash
     curl -H "Authorization: Bearer dsk-live-YOUR-KEY" \
          https://api.dedaluslabs.ai/v1/models
     ```

2. **Rate Limit Reached**
   - Free tier: Limited daily generations
   - Wait 24 hours or upgrade plan
   - Check Dedalus dashboard for quota

3. **Network/CORS Issues**
   - Backend must make the API call (not frontend)
   - Check backend logs for "Dedalus API error"
   - Verify URL is `https://api.dedaluslabs.ai` (no `/v1` suffix)

4. **Image Loading Overlay Won't Hide**
   - Should auto-hide for base64 data URLs
   - Check browser console for errors
   - Verify `ResultsDisplay.jsx` has updated useEffect logic

**Backend logs should show**:
```
Step 5: Generating image...
Calling Dedalus API: https://api.dedaluslabs.ai/v1/images/generations
Dedalus API response received
Image generated: generated
```

### Products Not Matching Well

**Symptoms**:
- Getting irrelevant products
- Missing key costume pieces
- Wrong budget tier items

**Solutions**:

1. **Limited Mock Database**
   - Current: Only 25 products in `backend/data/mockProducts.json`
   - Solution: Add more relevant products (see "Adding New Products" section)

2. **Improve Keywords**
   - Edit existing products to add more keywords
   - Match your common search terms:
     ```json
     "keywords": ["robe", "wizard", "purple", "mystical", "witch", "cloak"]
     ```

3. **Budget Filtering**
   - Check product `priceTier` matches your selected budget
   - Options: `"budget"`, `"mid"`, `"premium"`

4. **Better Descriptions**
   - More specific = better matching
   - ❌ Bad: "purple bunny"
   - ✅ Good: "purple bunny wizard with sparkly robes and golden wand"

### Port Already in Use

**Symptoms**:
- `Error: listen EADDRINUSE: address already in use :::3001`
- `Error: listen EADDRINUSE: address already in use :::5173`

**Solutions**:
```bash
# Find and kill process on backend port (3001)
lsof -ti:3001 | xargs kill -9

# Find and kill process on frontend port (5173)
lsof -ti:5173 | xargs kill -9

# Or kill all node processes (nuclear option)
killall node

# Then restart
npm run dev
```

### Installation Issues

**`npm install` fails**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json

# Reinstall
npm run install:all
```

**Missing dependencies**:
```bash
# Install specific workspace
cd frontend && npm install
cd backend && npm install
```

### API Request Timeout

**Symptoms**:
- Request takes > 60 seconds
- "No response from server" error
- Loading animation forever

**Causes**:
1. Groq API slow response (rare, usually < 2s)
2. Dedalus image generation (typically 15-30s, can spike)
3. Network issues

**Solutions**:
- Wait up to 90 seconds for first request (image generation is slow)
- Check backend logs for which step is hanging
- Test APIs individually:
  ```bash
  # Test Groq
  curl https://api.groq.com/openai/v1/models \
    -H "Authorization: Bearer $GROQ_API_KEY"
  
  # Test Dedalus
  curl https://api.dedaluslabs.ai/v1/models \
    -H "Authorization: Bearer $DEDALUS_API_KEY"
  ```

### Frontend Not Connecting to Backend

**Symptoms**:
- "Failed to fetch" or "Network error"
- Frontend loads but form submission fails

**Solutions**:

1. **Check backend is running**:
   ```bash
   curl http://localhost:3001/api/health
   # Should return: {"status":"ok","message":"HopSpark API is running"}
   ```

2. **Verify Vite proxy**:
   - Check `frontend/vite.config.js` has:
     ```javascript
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:3001',
           changeOrigin: true
         }
       }
     }
     ```

3. **Check CORS**:
   - Backend should have `app.use(cors())` enabled
   - See `backend/server.js`

4. **Port conflicts**:
   - Ensure nothing else is on ports 3001 or 5173
   - `lsof -i :3001` and `lsof -i :5173` to check

### Development Server Not Hot-Reloading

**Frontend not updating**:
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check Vite terminal for errors

**Backend not restarting**:
- Backend uses Node.js `--watch` flag
- Only works on Node 18+
- Manual restart: Kill terminal and run `npm run dev:backend`

### Strange Behavior After Updates

**Nuclear reset**:
```bash
# Stop all servers
killall node

# Clean everything
rm -rf node_modules frontend/node_modules backend/node_modules
rm -rf package-lock.json frontend/package-lock.json backend/package-lock.json

# Reinstall
npm run install:all

# Restart
npm run dev
```

### Getting Help

1. **Check backend terminal** for detailed error messages
2. **Check browser console** (F12) for frontend errors
3. **Enable verbose logging** in `backend/server.js`:
   ```javascript
   console.log('Step X:', JSON.stringify(data, null, 2));
   ```
4. **Test API directly** with curl to isolate frontend vs backend
5. **Check API status pages**:
   - Groq: [status.groq.com](https://status.groq.com)
   - Dedalus: Check dashboard for announcements

## 🏆 Hackathon Judging Criteria

**Innovation (25%)** ✅
- Unique bunny + magic cosplay niche
- AI-powered personalization
- Bridging imagination to execution

**Design (20%)** ✅
- Harry Potter magical theme
- Whimsical, accessible UI
- Mobile-responsive design

**Practicality (20%)** ✅
- Solves real accessibility problem
- Uses curated products
- Sustainable options highlighted

**Prototype (20%)** ✅
- Functional end-to-end flow
- Real AI generation
- Working demo

**Presentation (15%)** ✅
- Clear problem/solution story
- Social good messaging
- Beginner-friendly narrative

## 📝 Future Enhancements

### Short-Term (Next Hackathon Features)
- [ ] **Save & Share**: Generate shareable links for cosplay designs
- [ ] **Multiple Images**: Generate 2-3 variations per description
- [ ] **Style Presets**: Quick-select templates (Goth Bunny, Steampunk Rabbit, etc.)
- [ ] **Price Tracking**: Real-time price updates from product APIs
- [ ] **Mobile App**: React Native version for on-the-go planning

### Mid-Term (Production Features)
- [ ] **Real Product APIs**: 
  - Amazon Affiliate API integration
  - Etsy API for handmade items
  - AliExpress for budget options
  - Auto-updating prices and availability
- [ ] **User Accounts**: 
  - Save favorite designs
  - Track purchased items
  - Wishlist functionality
  - Order history
- [ ] **Community Gallery**:
  - Public showcase of generated cosplays
  - Like and comment system
  - Follow other users
  - Trending designs page
- [ ] **AR Try-On**: 
  - Use phone camera to preview costume
  - Virtual fitting room
  - Accessory placement preview

### Long-Term (Moonshot Ideas)
- [ ] **Tutorial Generator**: 
  - AI-generated DIY instructions
  - Video walkthrough suggestions
  - Skill difficulty ratings
  - Time estimates per piece
- [ ] **Thrift Store Finder**:
  - Local secondhand shop recommendations
  - Sustainable alternatives
  - Upcycling suggestions
  - Cost savings calculator
- [ ] **Convention Calendar**:
  - Integrate with cosplay event calendars
  - Deadline reminders for costume completion
  - Packing list generator
  - Travel cost estimates
- [ ] **AI Fabric Assistant**:
  - Fabric type recommendations
  - Yardage calculator
  - Sewing pattern suggestions
  - Difficulty ratings
- [ ] **Social Commerce**:
  - Marketplace for user-made pieces
  - Commission matching system
  - Bulk buy coordination
  - Group discount finder

### Technical Improvements
- [ ] **Performance**:
  - Image caching system
  - Redis for API response caching
  - CDN for generated images
  - Progressive image loading
- [ ] **Testing**:
  - Unit tests (Jest + React Testing Library)
  - E2E tests (Playwright)
  - API mocking for offline development
  - Load testing for concurrent users
- [ ] **DevOps**:
  - Docker containerization
  - CI/CD pipeline (GitHub Actions)
  - Automated deployment
  - Monitoring and alerting
- [ ] **Accessibility**:
  - WCAG 2.1 AA compliance
  - Screen reader optimization
  - Keyboard navigation
  - High contrast mode
  - Multi-language support

## 🧪 Technical Deep Dive

### Design Patterns Used

**Frontend**:
- **State Machine Pattern**: Three-stage flow (input → loading → results)
- **Composition Pattern**: Reusable components with clear responsibilities
- **Container/Presenter Pattern**: Smart components (App.jsx) vs presentational (Hero.jsx)

**Backend**:
- **Layered Architecture**: Routes → Services → Data
- **Service Pattern**: Separate services for each external API
- **Fallback Pattern**: Graceful degradation when APIs fail
- **Repository Pattern**: `mockProducts.json` as data source abstraction

### API Design Decisions

**Why POST for Generation?**
- Complex request body (description + options)
- Not idempotent (generates new images each time)
- Can't be cached effectively
- May include sensitive data in future

**Why Base64 for Images?**
- ✅ No need for temporary image storage
- ✅ No CDN setup required for MVP
- ✅ Images persist in browser session
- ✅ Works identically in dev and production
- ❌ Larger JSON payload (~1.4MB per image)
- ❌ Can't be cached separately from API response

**Future**: Switch to URL-based images with S3/Cloudinary storage

### Performance Characteristics

**Typical Request Breakdown**:
```
Total: ~20-35 seconds

Step 1: Groq Analysis           → ~1.5s
Step 2: Groq Search Queries     → ~1.0s
Step 3: Product Matching        → ~0.1s
Step 4: Groq Prompt Generation  → ~1.5s
Step 5: Dedalus Image Generation → 15-30s
Step 6: Response Assembly       → ~0.1s
```

**Bottleneck**: Image generation (DALL-E 3 via Dedalus)
- Can't be parallelized (depends on prompt from Step 4)
- Can't be pre-computed (unique for each request)
- Could batch multiple images per request in future

**Optimization Opportunities**:
- Parallel execution of Steps 2-3 (currently sequential)
- Cache common prompts/images (e.g., "purple bunny wizard")
- WebSocket for progress updates instead of blocking request
- Generate lower-res preview first, HD version async

### Security Considerations

**Current Implementation**:
- ✅ API keys in environment variables (not committed)
- ✅ CORS enabled for local dev only
- ✅ No user data collection
- ✅ No authentication required (public hackathon demo)

**Production Additions Needed**:
- [ ] Rate limiting (prevent abuse)
- [ ] API key rotation
- [ ] Request validation/sanitization
- [ ] HTTPS only
- [ ] CORS whitelist for specific domains
- [ ] User authentication for saved designs
- [ ] Audit logging

### Scalability Considerations

**Current Limitations**:
- Single-threaded Node.js backend
- No load balancing
- No horizontal scaling
- Blocking API calls
- In-memory product database

**Production Scaling**:
```
┌──────────────────────────────────────┐
│      Load Balancer (Nginx)          │
└──────────────┬───────────────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
   Backend 1       Backend 2  (Horizontal scaling)
       │               │
       ▼               ▼
┌──────────────────────────────────────┐
│     Redis Cache (API responses)      │
└──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│   PostgreSQL (Products + Users)      │
└──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│   S3/CDN (Generated images)          │
└──────────────────────────────────────┘
```

### Dependencies Overview

**Frontend** (`frontend/package.json`):
```json
{
  "react": "^18.3.1",           // UI framework
  "react-dom": "^18.3.1",       // React rendering
  "lucide-react": "^0.344.0",   // Icon library (MIT license)
  "axios": "^1.6.7",            // HTTP client
  "vite": "^5.4.2",             // Build tool (dev)
  "tailwindcss": "^3.4.1"       // CSS framework (dev)
}
```

**Backend** (`backend/package.json`):
```json
{
  "express": "^4.18.2",         // Web framework
  "cors": "^2.8.5",             // CORS middleware
  "dotenv": "^16.4.1",          // Environment variables
  "groq-sdk": "^0.3.1"          // Groq/Llama integration
}
```

**Why These Choices?**:
- **React**: Industry standard, great ecosystem
- **Vite**: 10x faster than Create React App
- **TailwindCSS**: Rapid UI development, small bundle
- **Express**: Minimal, flexible, well-documented
- **Groq SDK**: Official SDK, typed, handles auth
- **Axios**: Better error handling than fetch

**Bundle Sizes** (production):
- Frontend JS: ~150KB gzipped
- Frontend CSS: ~10KB gzipped
- Total initial load: ~160KB

### Code Quality Standards

**Linting**: Not configured (add ESLint + Prettier for production)
**Testing**: Not implemented (add Jest + React Testing Library)
**Type Checking**: Not used (consider TypeScript migration)
**Documentation**: Inline comments + this README

**For Production**:
```bash
# Add linting
npm install --save-dev eslint prettier eslint-config-prettier

# Add testing
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Add TypeScript (optional)
npm install --save-dev typescript @types/react @types/node
```

## 🤝 Contributing

This is a hackathon project built in 24 hours, so there's plenty of room for improvement! We welcome contributions of all kinds.

### How to Contribute

1. **Fork the repository**
   ```bash
   gh repo fork Jzaman2004/HopSpark
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes locally

4. **Commit with descriptive messages**
   ```bash
   git commit -m "Add: [Feature] Description of what you added"
   git commit -m "Fix: [Bug] Description of what you fixed"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Contribution Ideas

**Easy (Good First Issues)**:
- 🎨 Add new products to `mockProducts.json`
- 📝 Improve prompt templates in `groqService.js`
- 🎭 Add new example prompts to `CosplayInput.jsx`
- 🖼️ Design new loading animations
- 📱 Improve mobile responsiveness

**Medium**:
- 🔍 Add product filtering/sorting options
- 💾 Implement local storage for recent searches
- 📊 Add analytics/tracking (privacy-friendly)
- 🌙 Add dark/light mode toggle
- ♿ Improve accessibility (ARIA labels, keyboard nav)

**Advanced**:
- 🔌 Integrate real product APIs (Amazon, Etsy)
- 🗄️ Add database support (PostgreSQL + Prisma)
- 🔐 Implement user authentication (Auth0, Clerk)
- 🖼️ Add image upload for "try-on" feature
- 🧪 Add comprehensive test suite

### Code Style Guidelines

**JavaScript/React**:
- Use functional components with hooks
- Keep components under 200 lines
- Extract reusable logic into custom hooks
- Use meaningful variable names (no single letters except loops)

**Example**:
```javascript
// ✅ Good
const [cosplayResults, setCosplayResults] = useState(null);
const handleGenerateClick = async () => { ... };

// ❌ Bad
const [res, setRes] = useState(null);
const handleClick = async () => { ... };
```

**File Organization**:
- One component per file
- Services export named functions (not default)
- Keep related files together (component + styles)

**Naming Conventions**:
- Components: PascalCase (`CosplayInput.jsx`)
- Files: camelCase for services (`groqService.js`)
- Functions: camelCase (`generateCosplay()`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Testing Guidelines

**Before Submitting PR**:
1. Run both dev servers and test full flow
2. Test with missing API keys (fallback behavior)
3. Test on mobile viewport (responsive design)
4. Check browser console for errors
5. Verify no console warnings

**Manual Test Checklist**:
- [ ] Input form validation works
- [ ] All three sliders function correctly
- [ ] Example prompts load properly
- [ ] Loading animation displays during generation
- [ ] Results display with image and products
- [ ] Product list is scrollable
- [ ] Download button works for images
- [ ] "Regenerate" and "Start Over" buttons work
- [ ] Error messages display appropriately

### Project Roadmap

**v1.0 - MVP** (✅ Complete - Current State):
- Basic generation flow
- Groq + Dedalus integration
- Mock product database
- Magical UI theme

**v1.1 - Polish** (Next):
- User feedback collection
- Performance optimizations
- Better error messages
- Animated transitions

**v2.0 - Production** (Future):
- Real product APIs
- User accounts
- Save/share features
- Mobile app

### Getting Help

- 💬 Open a GitHub Issue for bugs
- 💡 Start a Discussion for feature ideas
- 📧 Contact: [Your Contact Info]
- 🐛 Include error logs and steps to reproduce

### Recognition

Contributors will be added to this README! 🎉

**Current Contributors**:
- [@Jzaman2004](https://github.com/Jzaman2004) - Creator
- You? - Add your contribution!

### Code of Conduct

Be respectful, inclusive, and constructive. This is a learning project—we're all here to improve and have fun!

---

## 📜 License

MIT License

Copyright (c) 2026 HopSpark Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 💖 Credits

- **Built for**: HopperHacks 2026 (Harry Potter themed)
- **Tracks**: Most Magical Hack, Best Creativity Hack
- **AI Models**: Groq (Llama 3.3-70B), Dedalus (DALL-E 3)
- **Made with**: ✨ magic and 🐰 love

---

## 🎬 Getting Started Now

```bash
# 1. Install dependencies
npm run install:all

# 2. Copy environment file
cp .env.local.example .env.local

# 3. Add your API keys to .env.local

# 4. Start the app
npm run dev

# 5. Open http://localhost:5173 and start creating! 🐰✨
```

**Need help?** Check the troubleshooting section or open an issue!

---

<div align="center">

### ✨ Transform into your magical bunny self with HopSpark! ✨

Made with 🐰 and ✨ for HopperHacks 2026

</div>