const express = require('express');
const router = express.Router();
const { verifyFirebaseToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const { getAllUsers, updateUserCredits, getAdminStats } = require('../controllers/adminController');

// All routes require authentication
router.use(verifyFirebaseToken);

// All routes require admin privileges
router.use(isAdmin);

// GET /api/admin/stats - Get admin statistics
router.get('/stats', getAdminStats);

// GET /api/admin/users - Get all users
router.get('/users', getAllUsers);

// PUT /api/admin/users/:userId/credits - Update user credits
router.put('/users/:userId/credits', updateUserCredits);

module.exports = router;
