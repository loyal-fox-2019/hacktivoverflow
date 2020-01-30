"use strict"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    upvotes: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    downvotes: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer