const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String
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
  tags: [{
    type: String
  }]
}, {
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question