// Based on COSPLAYFORGE working pattern
export async function generateCosplayImage(prompt) {
  const apiKey = process.env.DEDALUS_API_KEY || process.env.VITE_DEDALUS_API_KEY;
  const baseUrl = process.env.DEDALUS_API_URL || process.env.VITE_DEDALUS_API_URL || 'https://api.dedaluslabs.ai';
  
  if (!apiKey) {
    console.warn('Dedalus API key not found, using placeholder');
    return generatePlaceholderImage(prompt);
  }

  try {
    const requestBody = {
      prompt: prompt,
      model: 'openai/dall-e-3',
      size: '1024x1024',
      quality: 'hd',
      response_format: 'b64_json',
      n: 1
    };

    console.log('Calling Dedalus API:', `${baseUrl}/v1/images/generations`);

    const response = await fetch(`${baseUrl}/v1/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Dedalus API error response:', errorText);
      throw new Error(`Dedalus API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Dedalus API response received');
    
    // Return base64 data
    if (data.data && data.data[0] && data.data[0].b64_json) {
      return data.data[0].b64_json;
    }
    
    throw new Error('Invalid response format from Dedalus API');
  } catch (error) {
    console.error('Dedalus image generation error:', error);
    return generatePlaceholderImage(prompt);
  }
}

// Convert base64 to data URL for frontend
export function base64ToDataUrl(base64Data) {
  return `data:image/png;base64,${base64Data}`;
}

function generatePlaceholderImage(prompt) {
  // Return a base64-encoded placeholder pixel (1x1 purple image)
  // This way the frontend can still handle it consistently
  return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';
}
