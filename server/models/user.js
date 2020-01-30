'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcyrpt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `name required!`],
        maxlength: [30, `name max 30 characters!`]
    },
    email: {
        type: String,
        required: [true, `email required!`],
        match: [/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, `invalid email format!`
        ],
        lowercase: true,
        validate: {
            validator: function (v) {
                return User.findOne({
                    email: v
                })
                    .then(user => !user)
            },
            message: `email already registred, please use another email!`
        }
    },
    password: {
        type: String,
        required: [true, `password required!`],
        minlength: [6, `password min 6 characters!`]
    },
    tags: [{
        type: String,
    }]
    
}, { versionKey: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

userSchema.pre('save', function (next) {
    console.log(this.password)
    if (!this.isModified('password')) {
        next()
    }
    else {
        this.password = bcyrpt.hashSync(this.password, 8)
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User