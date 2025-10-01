const User = require('../models/User');

// Admin emails - Add your admin emails here
// IMPORTANT: Replace these with your actual admin emails
const ADMIN_EMAILS = [
  'admin@example.com',
  // Add your admin emails below:
  // 'youremail@gmail.com',
  // 'anotheradmin@example.com',
];

// For development/testing, you can set this to true to bypass admin check
// WARNING: Set to false in production!
const BYPASS_ADMIN_CHECK = process.env.BYPASS_ADMIN_CHECK === 'true' || false;

/**
 * Middleware to check if user is admin
 */
const isAdmin = async (req, res, next) => {
  try {
    const { firebaseUID, email } = req.user;

    // Bypass check for development (if enabled)
    if (BYPASS_ADMIN_CHECK) {
      console.log('⚠️  ADMIN CHECK BYPASSED (Development Mode)');
      return next();
    }

    // Verify user object exists
    if (!email) {
      return res.status(401).json({
        error: 'Unauthorized: User email not found'
      });
    }

    // Check if email is in admin list
    if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
      console.log(`🚫 Access denied for non-admin: ${email}`);
      return res.status(403).json({
        error: 'Forbidden: Admin access required',
        message: 'You do not have permission to access this resource'
      });
    }

    // Optionally verify user exists in database
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`✅ Admin access granted to: ${email}`);
    next();
  } catch (error) {
    console.error('❌ Admin middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { isAdmin, ADMIN_EMAILS };
