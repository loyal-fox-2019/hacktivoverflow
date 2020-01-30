'use strict';
const mongoose = require('mongoose');
const { hash } = require('../helpers/bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be blank'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank'],
    minlength: [8, 'Your password must be between 8 - 12'],
    maxlength: [12, 'Your password must be between 8 - 12'],
  },
  watchedTags: [],
})

UserSchema.pre('save', function(next) {
  const user = this;
  const password = hash(user.password);
  user.password = password;
  next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
