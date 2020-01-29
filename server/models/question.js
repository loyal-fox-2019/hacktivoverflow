const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required']
  },
  content: {
    type: String
  },
  tags: [{
    type: String
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true })

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
