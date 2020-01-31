const {model, models, Schema} = require('mongoose')

const QuesttionSchema = new Schema({
    title: {type: String},
    description: {type: String},
    upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    owner:{type: Schema.Types.ObjectId, ref: 'User'},
    answer: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    created: {type: Date},
    tag: [String]
})

const Question = model('Question', QuesttionSchema)

module.exports = Question