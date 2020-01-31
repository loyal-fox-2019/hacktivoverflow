const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    votes: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        value: {
            type: Number
        }
    }]
}, {timestamps: {createdAt: 'created_at'}})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer