const {model, models, Schema} = require('mongoose')

const AnswerSchema = new Schema({
    title: {type: String},
    description: {type: String},
    upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    question: {type: Schema.Types.ObjectId, ref: 'Question'},
    created: {type: Date}
})

const Answer = model('Answer', AnswerSchema)

module.exports = Answer