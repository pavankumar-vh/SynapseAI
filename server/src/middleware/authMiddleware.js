const admin = require('../config/firebase');

/**
 * Middleware to verify Firebase ID token
 * Attaches user info to req.user if token is valid
 */
const verifyFirebaseToken = async (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized: No token provided',
      });
    }

    // Extract token
    const token = authHeader.split('Bearer ')[1];

    // Verify token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach user info to request
    req.user = {
      firebaseUID: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        error: 'Unauthorized: Token expired',
      });
    }
    
    return res.status(401).json({
      error: 'Unauthorized: Invalid token',
    });
  }
};

module.exports = { verifyFirebaseToken };


