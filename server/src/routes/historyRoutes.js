const express = require('express');
const router = express.Router();
const { verifyFirebaseToken } = require('../middleware/authMiddleware');
const {
  getHistory,
  getHistoryById,
  deleteHistoryById,
} = require('../controllers/historyController');

// All routes require authentication
router.use(verifyFirebaseToken);

// GET /api/history - Get user's generation history (paginated)
router.get('/', getHistory);

// GET /api/history/:id - Get specific generation
router.get('/:id', getHistoryById);

// DELETE /api/history/:id - Delete generation
router.delete('/:id', deleteHistoryById);

module.exports = router;


