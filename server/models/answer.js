const { Schema } = require('mongoose')
const votesSchema = require('./votes')

const answerSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    votes: [votesSchema],
  },
  { timestamps: true },
)

module.exports = answerSchema
