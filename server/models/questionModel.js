const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true,
        default : 'unknown'
    },
    upvotes : [{
        type : String
    }],
    downvotes : [{
        type : String
    }],
    tags : Array,
    replies : Array,
    file : String
},{
    timestamps : true
});

questionSchema.plugin(uniqueValidator)

// Compile model from schema
var QuestionModel = mongoose.model('QuestionModel', questionSchema );

module.exports = QuestionModel
