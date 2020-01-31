const { Schema } = require('mongoose')

const votesSchema = new Schema({
  value: {
    type: Number,
    required: [true, 'Value of votes is required'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = votesSchema
