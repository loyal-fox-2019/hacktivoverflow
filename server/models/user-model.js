const {model, models, Schema} = require('mongoose')
const pass = require('../helper/password')

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'please input your first name']
    },
    lastName: {
        type: String,
        required: [true, 'please input your last name']
    },
    email: {
        type: String,
        required: [true, 'please input your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please input your password']
    }
})

UserSchema.pre('save', function(next){
    pass.hash(this.password)
    .then((data)=>{
        this.password = data
        next()
    })
})

const User = model('User', UserSchema)

module.exports = User