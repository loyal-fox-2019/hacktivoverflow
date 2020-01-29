const { Schema, model } = require('mongoose')

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })

const Answer = model('Answer', AnswerSchema)

module.exports = Answer