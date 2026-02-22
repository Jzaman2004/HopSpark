import Groq from 'groq-sdk';

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    return null;
  }
  return new Groq({ apiKey });
}

export async function analyzeCosplayDescription(description, options) {
  const groq = getGroqClient();
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
  const groq = getGroqClient();
  if (!groq) {
    console.warn('Groq API key not configured, using fallback prompt');
    return getFallbackPrompt(cosplayData, description);
  }
  
  try {
    const systemPrompt = `You are an expert at creating detailed DALL-E 3 prompts for magical cosplay concept art.

Create a prompt that:
- Describes a full-body or 3/4 view cosplay illustration
- Incorporates bunny features (ears, tail) naturally into the magical character design
- Uses specific costume details and colors from the user's description
- Creates a mystical, whimsical atmosphere with sparkles and magical effects
- Is styled as professional concept art or illustration (NOT a photograph of a real person)
- Captures the ${cosplayData.aesthetic || 'magical'} aesthetic

Return ONLY the prompt text, nothing else. Maximum 200 words.`;

    const userPrompt = `Create a DALL-E 3 prompt for this cosplay concept:

User Description: ${description}

Style Details:
- Colors: ${cosplayData.colors?.join(', ') || 'purple, gold'}
- Costume Pieces: ${cosplayData.costumePieces?.join(', ') || 'magical outfit'}
- Theme: ${cosplayData.magicTheme || 'wizard'}
- Aesthetic: ${cosplayData.aesthetic || 'cute'}
- Bunny Elements: ${cosplayData.bunnyElements?.join(', ') || 'ears, tail'}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.8,
      max_tokens: 400
    });
    
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Groq prompt generation error:', error);
    return getFallbackPrompt(cosplayData, description);
  }
}

export async function generateProductSearchQueries(cosplayData) {
  const groq = getGroqClient();
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
  const colors = cosplayData.colors?.join(' and ') || 'purple and gold';
  const pieces = cosplayData.costumePieces?.join(', ') || 'magical robes';
  const aesthetic = cosplayData.aesthetic || 'magical';
  const theme = cosplayData.magicTheme || 'wizard';
  
  return `A whimsical full-body concept art illustration of a ${aesthetic} bunny ${theme} character wearing ${pieces} in ${colors} colors. The character has cute bunny ears and a fluffy tail integrated naturally into the magical costume design. Mystical atmosphere with sparkles, magical glowing effects, and enchanted energy swirling around. Professional digital art style, fantasy character design, magical and enchanting mood. NOT a photograph, but a stylized cosplay concept illustration with vibrant colors and magical lighting.`;
}

function getFallbackSearchQueries(cosplayData) {
  return [
    ...cosplayData.costumePieces,
    ...cosplayData.colors,
    cosplayData.aesthetic,
    cosplayData.magicTheme
  ].slice(0, 7);
}
