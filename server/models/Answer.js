const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    content: {
        type: String,
        required: [true, "Answer is required"]
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports =  Answer