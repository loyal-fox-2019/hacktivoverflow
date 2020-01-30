const mongoose = require("mongoose")
const Schema = mongoose.Schema

const questionSchema = new Schema({
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
    tag: {
        type: String
    }
})


const Question = mongoose.model("Question", questionSchema)

module.exports = Question
