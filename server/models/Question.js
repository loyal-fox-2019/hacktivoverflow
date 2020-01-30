const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const Answer = require('./Answer')

const questionSchema = new Schema({
   title: {
      type: String,
      required: [true, 'Must insert title']
   },

   description: {
      type: String,
      required: [true, 'Must insert description']
   },

   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },

   answers: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer',
   }],

   votes: [{
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      },
      voteType: {
         type: String
      }
   }],

   tags: [{
      type: String
   }]
})

questionSchema.plugin(timestamp)

questionSchema.pre('remove', function(next) {
   Answer.remove({question: this._id}).exec()
   next()
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question