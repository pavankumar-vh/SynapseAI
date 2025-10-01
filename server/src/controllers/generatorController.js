const User = require('../models/User');
const { generateSocialMediaPost, generateBlogPostIdeas, explainCodeSnippet, generateFullBlogPost } = require('../services/geminiService');
const { CREDIT_COSTS, deductCredits } = require('../services/creditService');
const { saveGeneration } = require('../services/historyService');
const { TOOL_TYPES } = require('../utils/constants');

/**
 * Generate social media post
 */
const generateSocial = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;
    const { topic, tone } = req.body;

    // Find user
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check credits
    const creditCost = CREDIT_COSTS.SOCIAL_MEDIA;
    if (user.credits < creditCost) {
      return res.status(403).json({
        error: 'Insufficient credits',
        required: creditCost,
        available: user.credits,
      });
    }

    // Generate content
    const content = await generateSocialMediaPost(topic, tone);

    // Deduct credits
    const remainingCredits = await deductCredits(user._id, creditCost);

    // Save to history
    const generation = await saveGeneration({
      userId: user._id,
      toolType: TOOL_TYPES.SOCIAL_MEDIA,
      inputPrompt: { topic, tone },
      generatedContent: content,
      creditsUsed: creditCost,
    });

    res.json({
      content,
      creditsUsed: creditCost,
      remainingCredits,
      generationId: generation._id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generate blog post ideas
 */
const generateBlogIdeas = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;
    const { keyword, count } = req.body;

    // Find user
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check credits
    const creditCost = CREDIT_COSTS.BLOG_IDEAS;
    if (user.credits < creditCost) {
      return res.status(403).json({
        error: 'Insufficient credits',
        required: creditCost,
        available: user.credits,
      });
    }

    // Generate content
    const ideas = await generateBlogPostIdeas(keyword, count);

    // Deduct credits
    const remainingCredits = await deductCredits(user._id, creditCost);

    // Save to history (store ideas as a joined string)
    const generation = await saveGeneration({
      userId: user._id,
      toolType: TOOL_TYPES.BLOG_IDEAS,
      inputPrompt: { keyword, count },
      generatedContent: ideas.join('\n\n'),
      creditsUsed: creditCost,
    });

    res.json({
      ideas,
      creditsUsed: creditCost,
      remainingCredits,
      generationId: generation._id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Explain code snippet
 */
const explainCode = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;
    const { code, language } = req.body;

    // Find user
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check credits
    const creditCost = CREDIT_COSTS.CODE_EXPLAINER;
    if (user.credits < creditCost) {
      return res.status(403).json({
        error: 'Insufficient credits',
        required: creditCost,
        available: user.credits,
      });
    }

    // Generate explanation
    const explanation = await explainCodeSnippet(code, language);

    // Deduct credits
    const remainingCredits = await deductCredits(user._id, creditCost);

    // Save to history
    const generation = await saveGeneration({
      userId: user._id,
      toolType: TOOL_TYPES.CODE_EXPLAINER,
      inputPrompt: { code, language },
      generatedContent: explanation,
      creditsUsed: creditCost,
    });

    res.json({
      explanation,
      creditsUsed: creditCost,
      remainingCredits,
      generationId: generation._id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generate full blog post
 */
const generateFullBlog = async (req, res, next) => {
  try {
    const { firebaseUID } = req.user;
    const { title, keywords, tone } = req.body;

    // Find user
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check credits
    const creditCost = CREDIT_COSTS.FULL_BLOG;
    if (user.credits < creditCost) {
      return res.status(403).json({
        error: 'Insufficient credits',
        required: creditCost,
        available: user.credits,
      });
    }

    // Generate content
    const blogPost = await generateFullBlogPost(title, keywords, tone);

    // Deduct credits
    const remainingCredits = await deductCredits(user._id, creditCost);

    // Save to history
    const generation = await saveGeneration({
      userId: user._id,
      toolType: TOOL_TYPES.FULL_BLOG,
      inputPrompt: { title, keywords, tone },
      generatedContent: blogPost,
      creditsUsed: creditCost,
    });

    res.json({
      blogPost,
      creditsUsed: creditCost,
      remainingCredits,
      generationId: generation._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateSocial,
  generateBlogIdeas,
  explainCode,
  generateFullBlog,
};


