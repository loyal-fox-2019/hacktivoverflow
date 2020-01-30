const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: 'String',
        unique: [true,'Name must be unique.']
    },
    email: {
        type: String,
        unique: [true,'Email must be unique.'],
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
            message: 'Input proper email format.'
        }
    },
    password: {
        type: String,
        minlength: [6,'Password must be at least 6 characters.']
    },
    watchedTags: {
        type: Array
    }
},{
    timestamps: true
})

userSchema.pre('save', function() {
    this.password = hashPassword(this.password)
})

const User = mongoose.model('User', userSchema)

module.exports = User