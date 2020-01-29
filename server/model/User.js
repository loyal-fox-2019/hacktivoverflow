const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { generateHash } = require('../helper/bcryptjs')


const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:[true, 'username is required']
    },
    email:{
        type:String,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalid format'],
        required: [true, 'email is required']
    },
    password:{
        type:String,
        required: [true, 'password is required']
    },
    watchedTag:[{
        type: String
    }]
})

userSchema.pre('save', function(){
    this.password = generateHash(this.password)
})


const User = mongoose.model('User', userSchema)
module.exports = User