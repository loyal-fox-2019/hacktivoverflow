const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Question title is required']
    },
    description:{
        type: true,
        required: [true, 'Description is required']
    },
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question:{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes:[{type: Schema.Types.ObjectId, ref: 'User'}]
},{timestamps: true})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer