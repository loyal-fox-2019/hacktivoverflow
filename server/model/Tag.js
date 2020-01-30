const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Tag Name is Required']
    },
    QuestionList:[{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]

})

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag