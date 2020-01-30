const { Schema, model } = require('mongoose')

const answerSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
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
    type: Number,
    default: 0
  }
})

const Answer = model('Answer', answerSchema)

module.exports = Answer
