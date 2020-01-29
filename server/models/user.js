const { Schema, model } = require('mongoose')
const UniqVal = require('mongoose-unique-validator')
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        maxlength: 15,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email tidak valid']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password must more than 6 characters']
    },
    photo: {
        type: String,
    },
    watched_tags: []
})

userSchema.plugin(UniqVal)

userSchema.pre('save', function (next) {
    if (this.photo === 'null') {
        this.photo = 'https://image.freepik.com/free-vector/hand-painted-fox-design_1152-89.jpg'
    }
    this.password = hash(this.password)
    next()
})

const User = model('User', userSchema)

module.exports = User