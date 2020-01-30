'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
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
            ref: 'User',
            sparse: true,
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            sparse: true,
        }
    ],
    UserId: {
        type: Schema.Types.ObjectId,
        required: [true, 'User Id required'],
        ref: 'User'
    }
}, {
    timestamps: true
})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;