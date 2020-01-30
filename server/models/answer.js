const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    desc: {
        type: String,
        required:[true, 'you must enter your description']
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upVotes:{
        type: Array,
        default: []
    },
    downVotes:{
        type:Array,
        default: []
    },
    idQuestion:{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
})

const answer = mongoose.model('Answer', answerSchema)
module.exports = answer