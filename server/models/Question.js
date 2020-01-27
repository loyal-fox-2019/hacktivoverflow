'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty'],
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty'],
  },
  upvotes: [],
  downvotes: [],
  tags: [],
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
