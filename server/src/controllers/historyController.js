const User = require('../models/User');
const { getUserHistory, getGenerationById, deleteGeneration } = require('../services/historyService');
const { validatePagination } = require('../utils/helpers');

/**
 * Get user's generation history (paginated)
 */
const getHistory = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;
    const { page, limit } = validatePagination(req.query.page, req.query.limit);

    // Find user
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get paginated history
    const result = await getUserHistory(user._id, page, limit);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get specific generation by ID
 */
const getHistoryById = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;
    const { id } = req.params;

    // Find user
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get generation
    const generation = await getGenerationById(id, user._id);

    res.json({ generation });
  } catch (error) {
    if (error.message === 'Generation not found') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};

/**
 * Delete a generation from history
 */
const deleteHistoryById = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;
    const { id } = req.params;

    // Find user
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete generation
    await deleteGeneration(id, user._id);

    res.json({ message: 'Generation deleted successfully' });
  } catch (error) {
    if (error.message === 'Generation not found or unauthorized') {
      return res.status(404).json({ error: 'Generation not found' });
    }
    next(error);
  }
};

module.exports = {
  getHistory,
  getHistoryById,
  deleteHistoryById,
};


