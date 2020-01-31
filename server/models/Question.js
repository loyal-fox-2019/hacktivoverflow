const mongoose = require('mongoose')
const { Schema, model } = mongoose

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title must be filled out']
  },
  description: {
    type: String,
    required: [true, 'description must be filled out']
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user must be filled out']
  },
  tags: [{
    type: String
  }]
}, { timestamps: true })

const Question = model('Question', questionSchema)

module.exports = Question