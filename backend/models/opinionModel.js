const mongoose = require('mongoose');
const User = require('../models/userModel');
const opinionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  score: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for vote count
opinionSchema.virtual('voteCount').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Pre-save hook to calculate score
opinionSchema.pre('save', function(next) {
  if (this.isModified('upvotes') || this.isModified('downvotes')) {
    this.score = this.upvotes.length - this.downvotes.length;
  }
  next();
});

const Opinion = mongoose.model('Opinion', opinionSchema);
module.exports = Opinion;
