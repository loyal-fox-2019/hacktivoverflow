const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {
        type: String,
        required: [true, 'Body required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    downvotes: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
}
,{timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;