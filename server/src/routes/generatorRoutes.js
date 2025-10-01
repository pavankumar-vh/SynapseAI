const express = require('express');
const router = express.Router();
const { verifyFirebaseToken } = require('../middleware/authMiddleware');
const {
  validateSocialMediaPost,
  validateBlogIdeas,
  validateCodeExplainer,
} = require('../middleware/validateRequest');
const {
  generateSocial,
  generateBlogIdeas,
  explainCode,
  generateFullBlog,
} = require('../controllers/generatorController');

// All routes require authentication
router.use(verifyFirebaseToken);

// POST /api/generate/social - Generate social media post
router.post('/social', validateSocialMediaPost, generateSocial);

// POST /api/generate/blog-ideas - Generate blog post ideas
router.post('/blog-ideas', validateBlogIdeas, generateBlogIdeas);

// POST /api/generate/code-explainer - Explain code
router.post('/code-explainer', validateCodeExplainer, explainCode);

// POST /api/generate/full-blog - Generate full blog post
router.post('/full-blog', generateFullBlog);

module.exports = router;


