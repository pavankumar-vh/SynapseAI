import api from './api';

/**
 * Create a support ticket
 */
export const createSupportTicket = async (ticketData) => {
  try {
    const response = await api.post('/support/tickets', ticketData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get user's support tickets
 */
export const getUserTickets = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/support/tickets${queryString ? '?' + queryString : ''}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get ticket by ID
 */
export const getTicketById = async (ticketId) => {
  try {
    const response = await api.get(`/support/tickets/${ticketId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Add response to ticket
 */
export const addTicketResponse = async (ticketId, message) => {
  try {
    const response = await api.post(`/support/tickets/${ticketId}/responses`, { message });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all tickets (Admin only)
 */
export const getAllTickets = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/support/admin/tickets${queryString ? '?' + queryString : ''}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update ticket status (Admin only)
 */
export const updateTicketStatus = async (ticketId, data) => {
  try {
    const response = await api.put(`/support/admin/tickets/${ticketId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Add admin response to ticket
 */
export const addAdminResponse = async (ticketId, message) => {
  try {
    const response = await api.post(`/support/admin/tickets/${ticketId}/responses`, { message });
    return response.data;
  } catch (error) {
    throw error;
  }
};
