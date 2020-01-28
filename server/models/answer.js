const { Schema, model } = require('mongoose')

const answerSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
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

const Answer = model('Answer', answerSchema)

module.exports = Answer
