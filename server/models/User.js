const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    validate: {
      validator(username){
        return User
        .findOne({username})
        .then((user) => {
          if (user){
            return false
          }
          else {
            return true
          }
        })
        .catch(() => {
          return false
        })
      },
      message: 'Username is used'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [{
      validator(email){
        return User
        .findOne({email})
        .then((user) => {
          if (user){
            return false
          }
          else {
            return true
          }
        })
        .catch(() => {
          return false
        })
      },
      message: 'Email is used'
    }, {
      validator(email){
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
      },
      message: 'Email is not valid'
    }]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password is too short']
  },
  tags: {
    type: Array
  }
}, {
  timestamps: true
})

userSchema.pre('save', function(next){
  this.password = hash(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User