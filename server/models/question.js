const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: [true, 'Title is already registered'],
        maxlength: [75, "Name max 75 characters"]
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        unique: [true, 'Description is already registered'],
        maxlength: [500, "Description max 500 characters"],
    },
    upVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        count: true
    }],
    downVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        count: true
    }],
    user: {
        required: [true, 'User is required'],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    }],
    tags: [{
        type: String,
        maxlength: [30, 'tag max 30 char']
    }],
    status: {
        type: String,
        default: "Open"

    }
}, {
    timestamps:
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;