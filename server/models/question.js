const { Schema, model } = require('mongoose')

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [],
    upVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })

const Question = model('Question', QuestionSchema)

module.exports = Question