const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  platform: {
    type: String,
    enum: ['google', 'normal'],
    required: [true, 'Must Choose the platform between "google" or "normal"']
  }
})

module.exports = mongoose.model('Users', userSchema)
