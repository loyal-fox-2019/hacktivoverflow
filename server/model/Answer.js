const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    QuestionId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Question'
    },
    AuthorId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    upVotes: [String],
    downVotes:[String],
    createdAt:{
        type:Date,
        required: true
    }



})



const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer