const mongoose = require('mongoose')
const { Schema } = mongoose

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Questions must consist of title']
    },
    description: {
        type: String,
        required: [true, 'Questions must consist of content']
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
    }
},
{
    timestamps: true
})

const question = mongoose.model('Question', questionSchema)

module.exports = question