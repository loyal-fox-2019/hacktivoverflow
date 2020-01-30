'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', },
  questionId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title cannot be empty'],
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty'],
  },
  upvotes: {
    type: Number,
  },
  downvotes: {
    type: Number,
  },
  tags: [],
}, { timestamps: true });

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
