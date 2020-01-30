const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    description:{
        type:String,
        required:[true,'Please input description']
    },
    votes:[
        {
            userId : {type:String},
            vote : {type:Number},
            _id : false
        }
    ],
    author:{ type:Schema.Types.ObjectId, ref:'User' },
    question: { type: Schema.Types.ObjectId, ref: 'Question'}
})

const Answer = mongoose.model('Answer',answerSchema)

module.exports = Answer