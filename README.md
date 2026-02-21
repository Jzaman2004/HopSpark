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

**Purpose**: Natural language processing for cosplay analysis

1. **Get API Key**: Sign up at [console.groq.com](https://console.groq.com)
2. **Add to `.env.local`**:
   ```env
   VITE_GROQ_API_KEY=gsk_your_key_here
   VITE_GROQ_API_URL=https://api.groq.com/openai/v1
   ```
3. **Usage**: Automatically used for:
   - Parsing cosplay descriptions
   - Extracting colors, themes, and styles
   - Generating product search queries
   - Creating DALL-E prompts

### Dedalus API (DALL-E 3)

**Purpose**: AI image generation for cosplay previews

1. **Get API Key**: Sign up at [dedalus.ai](https://dedalus.ai)
2. **Add to `.env.local`**:
   ```env
   VITE_DEDALUS_API_KEY=dsk_your_key_here
   VITE_DEDALUS_API_URL=https://api.dedalus.ai/v1
   ```
3. **Usage**: Generates high-quality preview images (1024x1024px)

**Note**: If API keys are missing, the app uses fallback placeholder images.

## 🎨 How It Works

1. **User Input**: Describe your dream magical bunny cosplay
2. **AI Analysis**: Groq/Llama extracts colors, themes, and style
3. **Product Matching**: Algorithm finds items from product database
4. **Image Generation**: Dedalus/DALL-E creates preview image
5. **Results**: Display shopping list and preview side-by-side

### Example Flow

```
Input: "Elegant white bunny witch with purple robes and moon staff"
   ↓
Analysis: {colors: ["white", "purple"], theme: "witch", aesthetic: "elegant"}
   ↓
Products: White bunny ears, purple wizard robe, moon staff, etc.
   ↓
Image: AI-generated cosplay preview
   ↓
Results: Shopping list ($150 total) + preview image
```

## 🛠️ Development

### Run Commands

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend

# Build for production
cd frontend && npm run build
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GROQ_API_KEY` | Groq API key for Llama 3.3-70B | Yes |
| `VITE_DEDALUS_API_KEY` | Dedalus API key for DALL-E 3 | Yes |
| `VITE_GROQ_API_URL` | Groq API endpoint | No (has default) |
| `VITE_DEDALUS_API_URL` | Dedalus API endpoint | No (has default) |
| `VITE_USE_REAL_API` | Enable/disable real APIs | No (default true) |

### Tech Stack Details

**Frontend**:
- React 18 - UI framework
- Vite - Build tool (fast, modern)
- TailwindCSS - Utility-first styling
- Lucide React - Icon library
- Axios - HTTP client

**Backend**:
- Node.js + Express - REST API
- Groq SDK - Llama 3.3-70B integration
- Fetch API - DALL-E 3 integration
- CORS enabled for local development

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

1. Make sure `.env.local` is in the project root (not in frontend or backend folders)
2. Restart both dev servers after adding keys
3. Check console for environment variable messages
4. Verify keys are correct (no extra spaces)

### Image Generation Failing

- **Cause**: Dedalus API key invalid or rate limit reached
- **Solution**: Check API key, or app will use placeholder images
- **Fallback**: Placeholder images will be shown automatically

### Products Not Matching Well

- **Cause**: Limited mock database (25 items)
- **Solution**: Add more items to `backend/data/mockProducts.json`
- **Future**: Integrate real product APIs (Amazon, Etsy)

### Port Already in Use

```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

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

- [ ] Real product API integration (Amazon, Etsy)
- [ ] User accounts and saved cosplays
- [ ] Share cosplays on social media
- [ ] Community gallery of generated looks
- [ ] AR try-on feature
- [ ] Thrifting/secondhand options
- [ ] Tutorial videos for DIY pieces
- [ ] Budget calculator and wishlist

## 🤝 Contributing

This is a hackathon project! Feel free to:
- Add more products to the database
- Improve AI prompts
- Enhance UI/UX
- Add new features
- Fix bugs

## 📜 License

MIT License - feel free to use this for your own hackathon projects!

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