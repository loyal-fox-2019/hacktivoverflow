"use strict"
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answersSchema = new Schema({
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
    question: {
        type: Schema.Types.ObjectId,
        ref: "Questions"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String,
    },
}, {
    timestamps: true
})

const Answers = mongoose.model("Answers", answersSchema)

module.exports = Answers