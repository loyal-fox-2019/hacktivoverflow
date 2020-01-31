const mongoose = require('mongoose')
const { Schema, model } = mongoose

const answerSchema = new Schema({
  description: {
    type: String,
    ref: 'User'
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const Answer = model('Answer', answerSchema)

module.exports = Answer