"use strict"
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionsSchema = new Schema({
    title: {
        type: String,
        required: [true, "Required Title"]
    },
    description: {
        type: String,
        required: [true, "Required Description"]
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: "Answers"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})

const Questions = mongoose.model("Questions", questionsSchema)

module.exports = Questions