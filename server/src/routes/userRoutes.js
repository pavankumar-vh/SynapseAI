const express = require('express');
const router = express.Router();
const { verifyFirebaseToken } = require('../middleware/authMiddleware');
const { validateUserSync } = require('../middleware/validateRequest');
const { syncUser, getUserProfile, getUserCredits } = require('../controllers/userController');

// All routes require authentication
router.use(verifyFirebaseToken);

// POST /api/users/sync - Sync user with database
router.post('/sync', validateUserSync, syncUser);

// GET /api/user/profile - Get user profile
router.get('/profile', getUserProfile);

// GET /api/user/credits - Get user credits
router.get('/credits', getUserCredits);

module.exports = router;


