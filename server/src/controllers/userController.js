const User = require('../models/User');
const { getCredits } = require('../services/creditService');

/**
 * Sync user with database (create or update)
 * Called on first login or signup
 */
const syncUser = async (req, res, next) => {
  try {
    console.log('🔄 syncUser called');
    console.log('📝 Request user:', req.user);
    console.log('📝 Request body:', req.body);
    
    const { firebaseUID, email } = req.user;
    const { displayName } = req.body;

    if (!firebaseUID || !email) {
      console.error('❌ Missing firebaseUID or email in request');
      return res.status(400).json({ 
        error: 'Invalid request: Missing user authentication data' 
      });
    }

    // Check if user already exists
    let user = await User.findOne({ firebaseUID });
    let isNewUser = false;

    if (!user) {
      // Create new user with 100 free credits
      user = new User({
        firebaseUID,
        email,
        displayName: displayName || email.split('@')[0],
        credits: 100, // Initial free credits for all new users
      });
      isNewUser = true;
      console.log(`✅ Creating new user ${email} with 100 free credits`);
    } else {
      // Update existing user
      user.displayName = displayName || user.displayName;
      user.lastLoginAt = new Date();
      console.log(`✅ Syncing existing user ${email}, credits: ${user.credits}`);
    }

    await user.save();
    console.log(`✅ User saved successfully: ${email}, credits: ${user.credits}`);

    res.status(isNewUser ? 201 : 200).json({
      user: {
        _id: user._id,
        firebaseUID: user.firebaseUID,
        email: user.email,
        displayName: user.displayName,
        credits: user.credits,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
      isNewUser,
      message: isNewUser ? 'User profile created successfully with 100 free credits!' : 'User profile synced successfully',
    });
  } catch (error) {
    console.error('❌ Error in syncUser:', error);
    next(error);
  }
};

/**
 * Get current user's profile
 */
const getUserProfile = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;

    const user = await User.findOne({ firebaseUID });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        _id: user._id,
        firebaseUID: user.firebaseUID,
        email: user.email,
        displayName: user.displayName,
        credits: user.credits,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user's credit balance
 */
const getUserCredits = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;

    const user = await User.findOne({ firebaseUID });

    if (!user) {
      console.error(`❌ User not found for firebaseUID: ${firebaseUID}`);
      return res.status(404).json({ error: 'User not found. Please try logging in again.' });
    }

    console.log(`✅ Fetched credits for ${user.email}: ${user.credits}`);
    res.json({
      credits: user.credits,
    });
  } catch (error) {
    console.error('❌ Error in getUserCredits:', error);
    next(error);
  }
};

module.exports = {
  syncUser,
  getUserProfile,
  getUserCredits,
};


