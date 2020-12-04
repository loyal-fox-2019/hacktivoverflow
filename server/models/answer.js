const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        unique: [true, 'Description is already registered'],
        maxlength: [500, "Description max 500 characters"],
    },
    upVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps:
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;