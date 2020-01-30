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
        type : Schema.Types.ObjectId,
        ref : 'UserModel'
    }],
    downvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'UserModel'
    }],

},{
    timestamps : true
});

// Compile model from schema
var AnswerModel = mongoose.model('AnswerModel', answerSchema );

module.exports = AnswerModel