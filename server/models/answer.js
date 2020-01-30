'use strict'

const { Schema, model } = require('mongoose')

const answerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty']
  },
  upVotes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  downVotes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  questionId: {
    type: Schema.Types.ObjectId, ref: 'Question'
  }
})

const Answer = model('Answer', answerSchema)

module.exports = Answer