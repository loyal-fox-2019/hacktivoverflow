const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    upvote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: []
    },
    downvote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
