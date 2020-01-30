const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hasher} = require('../helpers/bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true,
    },
},{
    timestamps : true
});

userSchema.plugin(uniqueValidator)
userSchema.pre('save', function(){
    console.log(this.password)
    this.password = hasher(this.password)
    console.log(this.password)
})

// Compile model from schema
const UserModel = mongoose.model('User', userSchema );

module.exports = UserModel
