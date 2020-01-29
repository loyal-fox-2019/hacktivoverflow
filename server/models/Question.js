const {Schema, model} = require('mongoose')

const questionSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  content: {
    type: String,
    required: [true, 'Content cannot be empty']
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: {
    type: Array,
    validate: [ arrayLimit, '{PATH}, exceeds the limit of 5' ]
  }
}, {
  timestamps: true,
  versionKey: false
})

function arrayLimit(value) {
  return value.length <= 5
}

const Question = model('Question', questionSchema)
module.exports = Question