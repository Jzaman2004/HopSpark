import Groq from 'groq-sdk';

const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
const groq = apiKey && apiKey !== 'your_groq_api_key_here' ? new Groq({ apiKey }) : null;

export async function analyzeCosplayDescription(description, options) {
  if (!groq) {
    console.warn('Groq API key not configured, using fallback analysis');
    return getFallbackAnalysis(description, options);
  }
  
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a cosplay expert AI. Extract structured information from user descriptions.
          Return ONLY valid JSON with this exact structure:
          {
            "colors": ["color1", "color2"],
            "costumePieces": ["piece1", "piece2"],
            "magicTheme": "wizard|witch|sorcerer|enchantress|fairy|other",
            "bunnyElements": ["ears", "tail", "paws"],
            "aesthetic": "cute|elegant|gothic|steampunk|fairy|fantasy",
            "keywords": ["keyword1", "keyword2"]
          }
          
          User preferences:
          - Budget: ${options.budget}
          - Aesthetic: ${options.aesthetic}
          - Complexity: ${options.complexity}`
        },
        {
          role: 'user',
          content: description
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    const content = completion.choices[0].message.content;
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(content);
  } catch (error) {
    console.error('Groq analysis error:', error);
    return getFallbackAnalysis(description, options);
  }
}

export async function generateDallePrompt(cosplayData, description) {
  if (!groq) {
    console.warn('Groq API key not configured, using fallback prompt');
    return getFallbackPrompt(cosplayData, description);
  }
  
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `Create a detailed DALL-E 3 prompt for generating cosplay preview images.
          Requirements:
          - Full body shot or 3/4 view
          - Specific costume details from user description
          - Magical atmosphere (sparkles, mystical effects)
          - Bunny features (ears, tail) integrated naturally
          - High quality, professional cosplay photography style
          - Whimsical and magical aesthetic
          - NOT a real photo of a person, but a cosplay concept art or illustration
          
          Return ONLY the prompt text, nothing else.`
        },
        {
          role: 'user',
          content: `Create DALL-E prompt for: ${description}
          
          Extracted data: ${JSON.stringify(cosplayData)}`
        }
      ],
      temperature: 0.8,
      max_tokens: 300
    });
    
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Groq prompt generation error:', error);
    return getFallbackPrompt(cosplayData, description);
  }
}

export async function generateProductSearchQueries(cosplayData) {
  if (!groq) {
    console.warn('Groq API key not configured, using fallback search queries');
    return getFallbackSearchQueries(cosplayData);
  }
  
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `Generate specific product search keywords for a cosplay shopping list.
          Return ONLY a JSON array of strings like: ["keyword1", "keyword2", "keyword3"]
          Include 5-7 specific search terms for costume pieces.`
        },
        {
          role: 'user',
          content: `Generate search keywords for: ${JSON.stringify(cosplayData)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });
    
    const content = completion.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(content);
  } catch (error) {
    console.error('Groq search queries error:', error);
    return getFallbackSearchQueries(cosplayData);
  }
}

// Fallback functions when API key is not available
function getFallbackAnalysis(description, options) {
  const lower = description.toLowerCase();
  
  // Extract colors
  const colorKeywords = ['white', 'black', 'purple', 'pink', 'gold', 'silver', 'blue', 'green', 'red', 'brown', 'cream'];
  const colors = colorKeywords.filter(color => lower.includes(color));
  
  // Extract costume pieces
  const pieceKeywords = ['ears', 'robe', 'dress', 'skirt', 'boots', 'wand', 'staff', 'goggles', 'crown', 'gloves', 'corset'];
  const costumePieces = pieceKeywords.filter(piece => lower.includes(piece));
  
  // Determine theme
  let magicTheme = 'wizard';
  if (lower.includes('witch')) magicTheme = 'witch';
  else if (lower.includes('fairy')) magicTheme = 'fairy';
  else if (lower.includes('sorcerer')) magicTheme = 'sorcerer';
  else if (lower.includes('enchantress')) magicTheme = 'enchantress';
  
  // Determine aesthetic
  let aesthetic = options.aesthetic || 'cute';
  if (lower.includes('goth') || lower.includes('dark')) aesthetic = 'gothic';
  else if (lower.includes('steampunk')) aesthetic = 'steampunk';
  else if (lower.includes('elegant')) aesthetic = 'elegant';
  else if (lower.includes('fairy')) aesthetic = 'fairy';
  
  return {
    colors: colors.length > 0 ? colors : ['purple', 'gold'],
    costumePieces: costumePieces.length > 0 ? costumePieces : ['ears', 'robe', 'wand'],
    magicTheme,
    bunnyElements: ['ears'],
    aesthetic,
    keywords: [...colors, ...costumePieces, aesthetic, magicTheme]
  };
}

function getFallbackPrompt(cosplayData, description) {
  return `Professional cosplay concept art illustration of a magical bunny character in ${cosplayData.aesthetic} style, wearing ${cosplayData.costumePieces.join(', ')}, with ${cosplayData.colors.join(' and ')} color scheme, mystical atmosphere with sparkles and magical effects, full body shot, high quality digital art, whimsical and enchanting`;
}

function getFallbackSearchQueries(cosplayData) {
  return [
    ...cosplayData.costumePieces,
    ...cosplayData.colors,
    cosplayData.aesthetic,
    cosplayData.magicTheme
  ].slice(0, 7);
}
