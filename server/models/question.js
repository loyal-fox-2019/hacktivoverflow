const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Answer = require('./answer')

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
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true, toJSON: { virtuals: true } })

questionSchema.virtual('votes').get(function() {
  return this.upvotes.length - this.downvotes.length
})
// questionSchema.virtual('answerCount').get(async () => {
//   let count = await Answer.countDocuments()
//   return count
// })

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
