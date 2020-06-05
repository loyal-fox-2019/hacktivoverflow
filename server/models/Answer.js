const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const answerSchema = new Schema({
   content: {
      type: String,
      required: [true, 'Must insert answer']
   },

   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },

   question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true
   },

   votes: [{
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      },
      voteType: {
         type: String
      }
   }]
})

answerSchema.plugin(timestamp)

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer