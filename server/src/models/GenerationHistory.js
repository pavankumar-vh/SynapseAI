const mongoose = require('mongoose');

const generationHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  toolType: {
    type: String,
    required: true,
    enum: ['social_media', 'blog_ideas', 'code_explainer', 'full_blog'],
  },
  inputPrompt: {
    type: Object,
    required: true,
    // Structure varies by toolType:
    // social_media: { topic: String, tone: String }
    // blog_ideas: { keyword: String, count: Number }
    // code_explainer: { code: String, language: String }
    // full_blog: { title: String, keywords: String, tone: String }
  },
  generatedContent: {
    type: String,
    required: true,
  },
  creditsUsed: {
    type: Number,
    required: true,
    default: 10,
  },
  modelUsed: {
    type: String,
    default: 'gemini-pro',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Compound index for efficient querying by user and date
generationHistorySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('GenerationHistory', generationHistorySchema);


