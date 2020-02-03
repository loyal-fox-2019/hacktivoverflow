const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Must include author'],
      ref: 'Users'
    },
    title: {
      type: String,
      required: [true, 'Must include title']
    },
    description: {
      type: String,
      required: [true, 'Must include description']
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
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answers',
        default: []
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Questions', questionSchema)
