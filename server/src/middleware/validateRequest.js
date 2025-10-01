/**
 * Validation middleware for request data
 */

const validateSocialMediaPost = (req, res, next) => {
  const { topic, tone } = req.body;

  if (!topic || typeof topic !== 'string' || !topic.trim()) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  if (!tone || typeof tone !== 'string') {
    return res.status(400).json({ error: 'Tone is required' });
  }

  next();
};

const validateBlogIdeas = (req, res, next) => {
  const { keyword, count } = req.body;

  if (!keyword || typeof keyword !== 'string' || !keyword.trim()) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  if (!count || typeof count !== 'number' || count < 1 || count > 10) {
    return res.status(400).json({ error: 'Count must be between 1 and 10' });
  }

  next();
};

const validateCodeExplainer = (req, res, next) => {
  const { code, language } = req.body;

  if (!code || typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: 'Code is required' });
  }

  if (!language || typeof language !== 'string') {
    return res.status(400).json({ error: 'Language is required' });
  }

  next();
};

const validateUserSync = (req, res, next) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  next();
};

module.exports = {
  validateSocialMediaPost,
  validateBlogIdeas,
  validateCodeExplainer,
  validateUserSync,
};


