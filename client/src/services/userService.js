import api from './api';

/**
 * Get current user's profile
 * @returns {Promise<Object>}
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get current user's credit balance
 * @returns {Promise<number>}
 */
export const getUserCredits = async () => {
  try {
    console.log('📡 API: Fetching user credits...');
    const response = await api.get('/user/credits');
    console.log('✅ API: Credits received:', response.data.credits);
    return response.data.credits;
  } catch (error) {
    console.error('❌ API: Error fetching credits:', error.message);
    throw error;
  }
};


