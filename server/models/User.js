"use strict"
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'please fill email'],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email'],
        validate: {
            validator: function (v) {
                return mongoose.models.User.findOne({ email: v })
                    .then((result) => {
                        if (result) {
                            return false
                        } else {
                            return true
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
            },
            message: "Email address already registered"
        }
    },
    password: {
        type: String,
        minlength: [6, "Min password 6"],
        required: [true, 'please fill password']
    },
    username: {
        type: String,
        maxlength: [10, "Max username 10"],
        required: [true, 'please fill username'],
        validate: {
            validator: function (v) {
                return mongoose.models.User.findOne({ username: v })
                    .then((result) => {
                        if (result) {
                            return false
                        } else {
                            return true
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
            },
            message: "Username already registered"
        }
    },
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hashPassword(this.password)
    }
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User