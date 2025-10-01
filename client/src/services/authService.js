import api from './api';

/**
 * Sync user with backend (called on first login/signup)
 * @param {Object} userData - User data from Firebase
 * @returns {Promise<Object>}
 */
export const syncUser = async (userData) => {
  try {
    console.log('📡 API: Syncing user with backend:', userData.email);
    console.log('📡 API: Request payload:', JSON.stringify(userData, null, 2));
    
    const response = await api.post('/users/sync', {
      email: userData.email,
      displayName: userData.displayName || userData.email.split('@')[0]
    });
    
    console.log('✅ API: User sync response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ API: Error syncing user:', error.message);
    console.error('❌ API: Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};


