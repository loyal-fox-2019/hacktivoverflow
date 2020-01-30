const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    title: {
        type: String,
        required: [true, "please input title"]
    },
    description: {
        type: String,
        required: [true, "please input description"]
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "userid is required"],
        ref: "User"
    },
    questionId: {
        type: Schema.Types.ObjectId,
        required: [true, "userid is required"],
        ref: "Question"
    }
})

const Answer = mongoose.model("Answer", answerSchema)

module.exports = Answer