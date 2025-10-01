const express = require('express');
const router = express.Router();
const { verifyFirebaseToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const {
  createTicket,
  getUserTickets,
  getTicketById,
  addTicketResponse,
  getAllTickets,
  updateTicketStatus,
  addAdminResponse
} = require('../controllers/supportController');

// All routes require authentication
router.use(verifyFirebaseToken);

// User routes
router.post('/tickets', createTicket);
router.get('/tickets', getUserTickets);
router.get('/tickets/:ticketId', getTicketById);
router.post('/tickets/:ticketId/responses', addTicketResponse);

// Admin routes
router.get('/admin/tickets', isAdmin, getAllTickets);
router.put('/admin/tickets/:ticketId', isAdmin, updateTicketStatus);
router.post('/admin/tickets/:ticketId/responses', isAdmin, addAdminResponse);

module.exports = router;
