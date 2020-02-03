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
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  downvote: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  clicks: {
    type: Number
  },
  createdAt: {
    type: Date
  }
})

const Question = model('Question', questionSchema)

module.exports = Question
