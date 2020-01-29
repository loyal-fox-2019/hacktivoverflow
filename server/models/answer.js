const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    content: {
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

module.exports = mongoose.model('Answer', answerSchema);
