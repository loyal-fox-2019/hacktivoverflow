'use strict'

const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  description: {
    type: String,
    required: [true, 'Description cannot be empty']
  },
  answers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
  },
  upVotes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  tags: {
    type: [],
    required: [true, 'Tag cannot be empty']

  },
  downVotes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const Question = model('Question', questionSchema)

module.exports = Question