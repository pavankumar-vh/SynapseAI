import api from './api';

/**
 * Generate social media post
 * @param {Object} data - { topic: string, tone: string }
 * @returns {Promise<Object>}
 */
export const generateSocialPost = async (data) => {
  try {
    const response = await api.post('/generate/social', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Generate blog post ideas
 * @param {Object} data - { keyword: string, count: number }
 * @returns {Promise<Object>}
 */
export const generateBlogIdeas = async (data) => {
  try {
    const response = await api.post('/generate/blog-ideas', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Explain code snippet
 * @param {Object} data - { code: string, language: string }
 * @returns {Promise<Object>}
 */
export const explainCode = async (data) => {
  try {
    const response = await api.post('/generate/code-explainer', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Generate full blog post
 * @param {Object} data - { title: string, keywords: string, tone: string }
 * @returns {Promise<Object>}
 */
export const generateFullBlog = async (data) => {
  try {
    const response = await api.post('/generate/full-blog', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get generation history
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>}
 */
export const getHistory = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/history?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a generation from history
 * @param {string} id - Generation ID
 * @returns {Promise<Object>}
 */
export const deleteHistory = async (id) => {
  try {
    const response = await api.delete(`/history/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


