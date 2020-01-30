const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    name: {
        type: String,
        required: [true,'Input question name'],
        unique: [true,'Somebody has asked the same question.']
    },
    description: {
        type: String,
        required: [true,'Please input the description.']
    },
    tags: {
        type: Array,
        validate: [
            {
                validator: function(v) {
                    if(v.length > 5) {
                        return false
                    }
                },
                message: 'Maximum of 5 tags allowed.'
            },
            {
                validator: function(v) {
                    if(v.length==1 && v[0]==="") {
                        return false
                    }
                },
                message: 'Please input at least 1 tag.'
            }
        ]
    },
    votes:[
        {
            userId : {type:String},
            vote : {type:Number},
            _id : false
        }
    ],
    author:{type:Schema.Types.ObjectId, ref:'User'},
    answers:[{type:Schema.Types.ObjectId, ref:'Answer'}],
    totalVotes:Number,
},{
    timestamps: true
})

const Question = mongoose.model('Question',questionSchema)

module.exports = Question