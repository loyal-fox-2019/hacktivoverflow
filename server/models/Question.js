const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  permalink: {
    type: String,
  },
  tags: [String],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: "Answer"
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;