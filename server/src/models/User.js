const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  displayName: {
    type: String,
    default: '',
  },
  credits: {
    type: Number,
    default: 100, // All new users get 100 free credits
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
    default: Date.now,
  },
});

// Instance method to deduct credits
userSchema.methods.deductCredits = function (amount) {
  if (this.credits >= amount) {
    this.credits -= amount;
    return true;
  }
  return false;
};

// Instance method to add credits
userSchema.methods.addCredits = function (amount) {
  this.credits += amount;
};

// Instance method to check if user has enough credits
userSchema.methods.hasEnoughCredits = function (amount) {
  return this.credits >= amount;
};

module.exports = mongoose.model('User', userSchema);


