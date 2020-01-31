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
        default:'https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png'
    },
    watched_tags: []
})

userSchema.plugin(UniqVal, { message: 'Error, {PATH} sudah terpakai.' })

userSchema.pre('save', function (next) {
    if (this.photo === 'null') {
        this.photo = 'https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png'
    }
    this.password = hash(this.password)
    next()
})

const User = model('User', userSchema)

module.exports = User