"use strict"

const mongoose = require('mongoose')
const bcrypt = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
})

userSchema.pre('save', function () {
    const oldPassword = this.get('password')
    const newPassword = bcrypt.generatePassword(oldPassword)
    this.set('password', newPassword)
})

const User = mongoose.model('User', userSchema)

module.exports = User