'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field cannot be empty'],
    },
    description: {
        type: String,
        required: [true, 'Description field cannot be empty'],
    },
    upvotes: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    downvotes: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;