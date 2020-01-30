const { Schema, model } = require('mongoose')
const votesSchema = require('./votes')
const answerSchema = require('./answer')

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title question is required'],
      minlength: [6, 'Min length of title question is 6 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description question is required'],
      minlength: [10, 'Min length of description is 10 characters'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    answers: [answerSchema],
    votes: [votesSchema],
    tags: [String],
  },
  { timestamps: true },
)

const question = model('Question', questionSchema)

module.exports = question
