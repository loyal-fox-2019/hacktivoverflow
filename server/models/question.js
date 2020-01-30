'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, `question title required!`]
    },
    content: {
        type: String,
        required: [true, `question content required!`]
    },
    tags: [{
        type: String
    }],
    votes: {
        type: Map,
        of: Number,
    }

}, { versionKey: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, toJSON: { virtuals: true } })

questionSchema.pre('find', function () {
    this.populate('owner', 'name email totalUpVotes totalDownVotes')
    this.populate('answer totalAnswer')
})

questionSchema.virtual('totalUpVotes').get(function () {
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

questionSchema.virtual('totalDownVotes').get(function () {
    let voteData = Array.from(this.votes.values())
    let count = 0
    voteData.forEach((val) => {
        if (val == -1) {
            count++
        }
    })
    return count
})

questionSchema.virtual('answer', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'questionId'
})

questionSchema.virtual('totalAnswer', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'questionId',
    count: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question