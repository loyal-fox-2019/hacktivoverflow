const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  answer: {
    type: [Schema.Types.ObjectId],
    ref: 'Answer'
  },
  upvote: {
    type: Number
  },
  downvote: {
    type: Number
  },
  clicks: {
    type: Number
  }
})

const Question = model('Question', questionSchema)

module.exports = Question
