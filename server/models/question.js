'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
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
    }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;