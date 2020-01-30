'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    QuestionId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Question Id required'],
        ref: 'Question'
    },
    UserId: {
        type: Schema.Types.ObjectId,
        required: [true, 'User Id required'],
        ref: 'User'
    }
}, {
    timestamps: true
})

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;