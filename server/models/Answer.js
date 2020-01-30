const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Answer description is required']
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  QuestionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'    
  }
}, {
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer