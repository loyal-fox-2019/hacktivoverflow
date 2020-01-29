const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword} = require('../helpers/bcrypt')

const userSchema = new Schema({
    username : {
        type: String,
        required: [true, 'you must enter your username']
    },
    email : {
        type: String,
        required: [true, 'you must enter your email'],
        validate:{
            validator: function (v){
                return user.findOne({
                    email : v
                })
                .then(data=>{
                    if(data){
                        return false
                    }else{
                        return true
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            msg: 'email already registered'
        }
    },
    password : {
        type: String,
        required:[true, 'you must enter your password']
    },
    tags: {
        type: [String],
        default: []
    }
})

userSchema.pre('save', function(next){
    this.password = hashPassword(this.password)
    next()
})

const user = mongoose.model('User', userSchema)
module.exports = user