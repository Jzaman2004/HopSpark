import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function generateCosplay(description, options) {
  try {
    const response = await axios.post(`${API_BASE}/generate`, {
      description,
      options
    }, {
      timeout: 60000 // 60 second timeout
    });

    return {
      ...response.data,
      originalDescription: description,
      originalOptions: options
    };
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.response) {
      throw new Error(error.response.data.error || 'Server error occurred');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Failed to send request. Please try again.');
    }
  }
}
