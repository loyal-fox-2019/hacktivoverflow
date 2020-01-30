'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId : {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    content: {
        type: String,
        required: [true, `answer content required!`]
    },
    votes: {
        type: Map,
        of: Number,
    },

}, { versionKey: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, toJSON: { virtuals: true } })

answerSchema.virtual('totalUpVotes').get(function () {
    if (this.votes) {
        let voteData = Array.from(this.votes.values())
        let count = 0
        voteData.forEach((val) => {
            if (val == 1) {
                count++
            }
        })
        return count
    }

})

answerSchema.virtual('totalDownVotes').get(function () {
    let voteData = Array.from(this.votes.values())
    let count = 0
    voteData.forEach((val) => {
        if (val == -1) {
            count++
        }
    })
    return count
})

answerSchema.virtual('totalVotes').get(function () {
    if (this.votes) {
        let voteData = Array.from(this.votes.values())
        let count = 0
        voteData.forEach((val) => {
            if (val != 0) {
                count++
            }
        })
        return count
    }

})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer