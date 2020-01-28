const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Question title is required']
    },
    description:{
        type: String,
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

const Question = mongoose.model('Question', questionSchema)

module.exports = Question