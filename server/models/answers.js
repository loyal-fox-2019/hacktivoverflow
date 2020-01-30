const mongoose = require('mongoose')
const { Schema } = mongoose

const answerSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Answers must consist of content']
    },
    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
},
{
    timestamps: true
})

const answer = mongoose.model('Answer', answerSchema)

module.exports = answer