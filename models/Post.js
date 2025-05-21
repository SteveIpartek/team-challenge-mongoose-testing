const mongoose = require('mongoose');
const { type } = require('os');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post =mongoose.model('Post', PostSchema);

module.exports = Post;
