"use strict"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionAnswer = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'title is required']
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
    }
})

const Question = mongoose.model('Question', questionAnswer)

module.exports = Question