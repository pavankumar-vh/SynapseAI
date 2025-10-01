import api from './api';

/**
 * Get all users (Admin only)
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>}
 */
export const getAllUsers = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/admin/users${queryString ? '?' + queryString : ''}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user credits (Admin only)
 * @param {string} userId - User ID
 * @param {Object} data - { credits: number, action: 'set'|'add'|'deduct' }
 * @returns {Promise<Object>}
 */
export const updateUserCredits = async (userId, data) => {
  try {
    const response = await api.put(`/admin/users/${userId}/credits`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get admin statistics
 * @returns {Promise<Object>}
 */
export const getAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};
