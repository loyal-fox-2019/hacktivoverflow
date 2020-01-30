const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')
const {hashPassword} = require('../helpers/bcrypt')

const Question = require('./Question')

const userSchema = new Schema({
   username: {
      type: String,
      required: [true, 'Please insert username'],
      unique: [true, 'This username has been registered']
   },

   password: {
      type: String,
      required: [true, 'Please insert password'],
   },

   email: {
      type: String,
      required: [true, 'Please insert email'],
      unique: [true, 'Another user has been registered with this email']
   },

   watchedTags: [{
      type: String,
      ref: 'Tag'
   }],

   questions: [{
      type: Schema.Types.ObjectId,
      ref: 'Question'
   }],

   answers: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer'
   }]
})

userSchema.plugin(timestamp)

userSchema.pre('save', function(next) {
   this.password = hashPassword(this.password)
   next()
})

userSchema.pre('remove', function(next) {
   Question.remove({user: this._id}).exec()
   next()
})

const User = mongoose.model('User', userSchema)

module.exports = User