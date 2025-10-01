const { generateContent } = require('../config/gemini');

/**
 * Generate social media post using Gemini
 * @param {string} topic - The topic for the post
 * @param {string} tone - The desired tone
 * @returns {Promise<string>} Generated social media post
 */
const generateSocialMediaPost = async (topic, tone) => {
  const prompt = `Create an engaging social media post about "${topic}" with a ${tone} tone. 
The post should be:
- Concise and attention-grabbing (150-250 characters)
- Include relevant emojis
- End with a call-to-action or thought-provoking question
- Be suitable for platforms like Twitter, LinkedIn, or Facebook

Just provide the post content, no additional explanations.`;

  return await generateContent(prompt);
};

/**
 * Generate blog post ideas using Gemini
 * @param {string} keyword - The keyword to base ideas on
 * @param {number} count - Number of ideas to generate
 * @returns {Promise<string[]>} Array of blog post ideas
 */
const generateBlogPostIdeas = async (keyword, count) => {
  const prompt = `Generate ${count} creative and SEO-friendly blog post title ideas about "${keyword}".
Requirements:
- Each title should be unique and engaging
- Include the keyword or related terms
- Make them actionable and compelling
- Suitable for various audiences

Format: Provide only the titles, one per line, numbered. No additional explanations.`;

  const result = await generateContent(prompt);
  
  // Parse the result into an array of ideas
  const ideas = result
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => line.replace(/^\d+\.\s*/, '').trim())
    .filter((line) => line.length > 0);

  return ideas.slice(0, count); // Ensure we only return the requested count
};

/**
 * Explain code using Gemini
 * @param {string} code - The code to explain
 * @param {string} language - The programming language
 * @returns {Promise<string>} Explanation of the code
 */
const explainCodeSnippet = async (code, language) => {
  const prompt = `Explain the following ${language} code in natural language:

\`\`\`${language}
${code}
\`\`\`

Provide a clear, detailed explanation that covers:
1. What the code does (overall purpose)
2. How it works (step-by-step breakdown)
3. Key concepts or patterns used
4. Any potential issues or improvements

Make the explanation beginner-friendly but thorough.`;

  return await generateContent(prompt);
};

/**
 * Generate full blog post using Gemini
 * @param {string} title - The blog post title
 * @param {string} keywords - Keywords to include
 * @param {string} tone - The desired tone
 * @returns {Promise<string>} Full blog post content
 */
const generateFullBlogPost = async (title, keywords, tone) => {
  const prompt = `Write a comprehensive, well-structured blog post with the following specifications:

Title: "${title}"
Keywords to include: ${keywords}
Tone: ${tone}

Requirements:
- Create a detailed, engaging blog post (approximately 2000-3000 words)
- Include an attention-grabbing introduction
- Use proper headings (H2, H3) to structure the content
- Include 6-8 main sections with detailed explanations
- Add relevant examples, statistics, or case studies where appropriate
- Include actionable tips or takeaways
- End with a strong conclusion and call-to-action
- Use the keywords naturally throughout the content
- Make it SEO-friendly and reader-friendly
- Format with proper markdown (headings, lists, bold, italic)

Write the complete blog post now:`;

  return await generateContent(prompt);
};

module.exports = {
  generateSocialMediaPost,
  generateBlogPostIdeas,
  explainCodeSnippet,
  generateFullBlogPost,
};



