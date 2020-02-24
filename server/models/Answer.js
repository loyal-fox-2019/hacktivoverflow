const {Schema, model} = require('mongoose')

const answerSchema = new Schema ({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    require: [true, 'Content cannot be empty']
  },
  vote: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    value: {
      type: Number,
      default: 0
    }
  }],
  isAnswer: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
  versionKey: false
})

const Answer = model('Answer', answerSchema)
module.exports = Answer