const User = require('../models/User');

// Credit costs for each tool
const CREDIT_COSTS = {
  SOCIAL_MEDIA: parseInt(process.env.CREDIT_COST_SOCIAL) || 10,
  BLOG_IDEAS: parseInt(process.env.CREDIT_COST_BLOG) || 15,
  CODE_EXPLAINER: parseInt(process.env.CREDIT_COST_CODE) || 20,
  FULL_BLOG: parseInt(process.env.CREDIT_COST_FULL_BLOG) || 30,
};

/**
 * Check if user has enough credits
 * @param {string} userId - User's MongoDB ID
 * @param {number} amount - Required credit amount
 * @returns {Promise<boolean>}
 */
const hasEnoughCredits = async (userId, amount) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user.hasEnoughCredits(amount);
};

/**
 * Deduct credits from user
 * @param {string} userId - User's MongoDB ID
 * @param {number} amount - Amount to deduct
 * @returns {Promise<number>} Remaining credits
 */
const deductCredits = async (userId, amount) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.deductCredits(amount)) {
    throw new Error('Insufficient credits');
  }

  await user.save();
  return user.credits;
};

/**
 * Add credits to user
 * @param {string} userId - User's MongoDB ID
 * @param {number} amount - Amount to add
 * @returns {Promise<number>} New credit balance
 */
const addCredits = async (userId, amount) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  user.addCredits(amount);
  await user.save();
  return user.credits;
};

/**
 * Get user's credit balance
 * @param {string} userId - User's MongoDB ID
 * @returns {Promise<number>} Credit balance
 */
const getCredits = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  return user.credits;
};

module.exports = {
  CREDIT_COSTS,
  hasEnoughCredits,
  deductCredits,
  addCredits,
  getCredits,
};


