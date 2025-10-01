const { GoogleGenerativeAI } = require('@google/generative-ai');

// Validate API key exists
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
  throw new Error('GEMINI_API_KEY is required');
}

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Get Gemini model instance
 * @param {string} modelName - Model name (default: 'gemini-2.5-pro')
 * @returns {Object} Gemini model instance
 */
const getGeminiModel = (modelName = 'gemini-2.5-pro') => {
  return genAI.getGenerativeModel({ model: modelName });
};

/**
 * Generate content using Gemini
 * @param {string} prompt - The prompt to generate content from
 * @param {string} modelName - Model name (optional)
 * @returns {Promise<string>} Generated content
 */
const generateContent = async (prompt, modelName = 'gemini-2.5-pro') => {
  try {
    console.log('🤖 Calling Gemini API with model:', modelName);
    const model = getGeminiModel(modelName);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('✅ Gemini API response received');
    return text;
  } catch (error) {
    console.error('❌ Gemini API error:', error.message);
    
    // Provide more specific error messages
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key not valid')) {
      throw new Error('Invalid Gemini API key. Please get a new key from https://aistudio.google.com/app/apikey');
    } else if (error.message?.includes('404') || error.message?.includes('not found')) {
      throw new Error('The Gemini API key is invalid or expired. Please generate a new API key from Google AI Studio (https://aistudio.google.com/app/apikey) and update your .env file');
    } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      throw new Error('Gemini API rate limit exceeded. Please try again later');
    } else if (error.message?.includes('model')) {
      throw new Error('Invalid Gemini model. Please check the model name');
    } else if (error.message?.includes('SAFETY')) {
      throw new Error('Content was blocked by safety filters. Please try different input');
    } else {
      throw new Error(`Failed to generate content: ${error.message || 'Unknown error'}`);
    }
  }
};

module.exports = {
  getGeminiModel,
  generateContent,
};


