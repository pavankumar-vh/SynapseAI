const User = require('../models/User');

/**
 * Get all users (Admin only)
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    
    const query = search 
      ? { $or: [
          { email: { $regex: search, $options: 'i' } },
          { displayName: { $regex: search, $options: 'i' } }
        ]}
      : {};

    const users = await User.find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalUsers: count
    });
  } catch (error) {
    console.error('❌ Error in getAllUsers:', error);
    next(error);
  }
};

/**
 * Update user credits (Admin only)
 */
const updateUserCredits = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { credits, action } = req.body; // action: 'set', 'add', 'deduct'

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const oldCredits = user.credits;

    switch (action) {
      case 'set':
        user.credits = credits;
        break;
      case 'add':
        user.credits += credits;
        break;
      case 'deduct':
        user.credits = Math.max(0, user.credits - credits);
        break;
      default:
        return res.status(400).json({ error: 'Invalid action. Use: set, add, or deduct' });
    }

    await user.save();

    console.log(`✅ Admin updated credits for ${user.email}: ${oldCredits} -> ${user.credits}`);

    res.json({
      message: 'Credits updated successfully',
      user: {
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
        credits: user.credits,
        oldCredits
      }
    });
  } catch (error) {
    console.error('❌ Error in updateUserCredits:', error);
    next(error);
  }
};

/**
 * Get admin statistics
 */
const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCreditsDistributed = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$credits' } } }
    ]);

    const recentUsers = await User.find()
      .select('email displayName credits createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalCreditsInSystem: totalCreditsDistributed[0]?.total || 0,
      recentUsers
    });
  } catch (error) {
    console.error('❌ Error in getAdminStats:', error);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  updateUserCredits,
  getAdminStats
};
