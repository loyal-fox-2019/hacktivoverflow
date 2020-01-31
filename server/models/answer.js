const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const answerSchema = new Schema({  
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, {timestamps : true},{versionKey : false});   //timestamps add createdAt, updatedAt fields

answerSchema.pre('save',function(next) {
    for(let i=0;i<this.upvotes.length;i++)
    {
        this.upvotes[i] = ObjectId(this.upvotes[i]);
    }

    for(let i=0;i<this.downvotes.length;i++)
    {
        this.downvotes[i] = ObjectId(this.downvotes[i]);
    }
    next();
})

const Answer = mongoose.model("Answer",answerSchema);

module.exports = Answer;