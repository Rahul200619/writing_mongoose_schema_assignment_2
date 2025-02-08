// Import mongoose
const mongoose = require('mongoose');

// Define the comment schema
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the blog post schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Title must be at least 5 characters long'],
  },
  content: {
    type: String,
    required: true,
    minlength: [50, 'Content must be at least 50 characters long'],
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // Array of strings for tags
    default: [],
  },
  category: {
    type: String,
    default: 'General',
  },
  likes: {
    type: [String], // Array of strings for usernames who liked the post
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema], // Embed the comment schema within the blog post schema
});

// Add a pre-save hook to update the `updatedAt` field whenever the post is updated
blogPostSchema.pre('save', function (next) {
  if (this.isModified('content') || this.isModified('title')) {
    this.updatedAt = Date.now();
  }
  next();
});

// Create models for blog posts and comments
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Export the models
module.exports = { BlogPost, Comment };
