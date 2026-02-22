export async function generateCosplayImage(prompt) {
  const apiKey = process.env.DEDALUS_API_KEY || process.env.VITE_DEDALUS_API_KEY;
  const rawApiUrl = process.env.DEDALUS_API_URL || process.env.VITE_DEDALUS_API_URL || 'https://api.dedalus.ai';
  const apiUrl = rawApiUrl.endsWith('/v1') ? rawApiUrl : `${rawApiUrl}/v1`;
  const model = process.env.DEDALUS_IMAGE_MODEL || 'openai/dall-e-3';
  
  if (!apiKey) {
    console.warn('Dedalus API key not found, using placeholder');
    return generatePlaceholderImage(prompt);
  }

  try {
    const response = await fetch(`${apiUrl}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd',
        style: 'vivid',
        response_format: 'b64_json'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Dedalus API error: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Handle different response formats
    if (data.data && data.data[0]) {
      const imageUrl = data.data[0].url;
      const base64Data = data.data[0].b64_json;
      if (imageUrl) return imageUrl;
      if (base64Data) return `data:image/png;base64,${base64Data}`;
    }
    
    throw new Error('Invalid response format from Dedalus API');
  } catch (error) {
    console.error('Dedalus image generation error:', error);
    return generatePlaceholderImage(prompt);
  }
}

function generatePlaceholderImage(prompt) {
  // Generate a placeholder using a public service
  const encodedPrompt = encodeURIComponent(prompt.substring(0, 100));
  return `https://via.placeholder.com/1024x1024/4B0082/FFD700?text=HopSpark+Cosplay`;
}
