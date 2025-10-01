const GenerationHistory = require('../models/GenerationHistory');

/**
 * Save generation to history
 * @param {Object} data - Generation data
 * @returns {Promise<Object>} Saved generation
 */
const saveGeneration = async (data) => {
  const generation = new GenerationHistory(data);
  await generation.save();
  return generation;
};

/**
 * Get user's generation history with pagination
 * @param {string} userId - User's MongoDB ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Paginated history
 */
const getUserHistory = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [history, total] = await Promise.all([
    GenerationHistory.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    GenerationHistory.countDocuments({ userId }),
  ]);

  return {
    history,
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
  };
};

/**
 * Get specific generation by ID
 * @param {string} generationId - Generation ID
 * @param {string} userId - User's MongoDB ID
 * @returns {Promise<Object>} Generation
 */
const getGenerationById = async (generationId, userId) => {
  const generation = await GenerationHistory.findOne({
    _id: generationId,
    userId,
  });

  if (!generation) {
    throw new Error('Generation not found');
  }

  return generation;
};

/**
 * Delete generation from history
 * @param {string} generationId - Generation ID
 * @param {string} userId - User's MongoDB ID
 * @returns {Promise<void>}
 */
const deleteGeneration = async (generationId, userId) => {
  const result = await GenerationHistory.deleteOne({
    _id: generationId,
    userId,
  });

  if (result.deletedCount === 0) {
    throw new Error('Generation not found or unauthorized');
  }
};

/**
 * Get total generations count for user
 * @param {string} userId - User's MongoDB ID
 * @returns {Promise<number>} Total count
 */
const getTotalGenerations = async (userId) => {
  return await GenerationHistory.countDocuments({ userId });
};

module.exports = {
  saveGeneration,
  getUserHistory,
  getGenerationById,
  deleteGeneration,
  getTotalGenerations,
};


