const mongoose = require('mongoose');

const schema = mongoose.Schema(
  // Schema (blueprint)
  {
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('comment', schema);

module.exports = Comment;
