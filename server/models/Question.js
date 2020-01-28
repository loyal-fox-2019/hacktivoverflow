

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    },
    slug: {
        type: String
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    upvote: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    tags: [{
        type: Schema.Types.ObjectId, ref: 'Tag'
    }],
    answers: [{
        type: Schema.Types.ObjectId, ref: 'Answer'
    }],
    views: {
        type: Number
    }
}, {
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question