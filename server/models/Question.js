const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title required']
    },
    body: {
        type: String,
        required: [true, 'Body required']
    },
    tags: {
        type: [String],
        required: [true, 'Tags required']
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    view: {
        type: Number,
        default: 0
    },
    hasNewComment: {
        type: Boolean,
        default: false
    }
},
{timestamps: true});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;