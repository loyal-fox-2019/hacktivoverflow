const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var answerSchema = new Schema({
    content: {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true,
    },
    QuestionId : [{
        type : Schema.Types.ObjectId,
        ref : 'QuestionModel' ,
        required : true
    }],
    upvotes : [{
        type : String
    }],
    downvotes : [{
        type : String
    }],

},{
    timestamps : true
});

// Compile model from schema
var AnswerModel = mongoose.model('AnswerModel', answerSchema );

module.exports = AnswerModel