const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      required: [true, 'Question is required, question is from question id'],
      ref: 'Questions'
    },
    description: {
      type: String,
      required: [true, , 'Decription is required']
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        default: []
      }
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        default: []
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Answers', answerSchema)
