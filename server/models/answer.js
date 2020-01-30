const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const answerSchema = new Schema({
  content: {
    type: String,
    required: [true, 'answer is required']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // question: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Question'
  // },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true })

answerSchema.virtual('votes').get(function() {
  return this.upvotes.length - this.downvotes.length
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
