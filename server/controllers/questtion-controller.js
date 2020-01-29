const questionModel = require('../models/question-model')
const answerModel = require('../models/answer-model')

class Question{
    static create (req,res,next){
        let input = {
            title: req.body.title,
            description: req.body.description,
            owner: req.data.userId,
            tag: req.body.tag,
            created: new Date ()
        }
        questionModel.create(input)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static find (req,res,next){
        questionModel.find().populate('owner')
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static findone (req,res,next){
        questionModel.findById(req.params.id)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static upvote (req,res,next){
        questionModel.findOne({'_id': req.params.id})
        .then((data)=>{
            if(data.upvotes.includes(req.data.userId) == false){
                return questionModel.update({'_id': req.params.id}, 
                {
                    $push: {upvotes: req.data.userId},
                    $pull: {downvotes: req.data.userId}
                })
            } 
            if(data.upvotes.includes(req.data.userId) == true) {
                return questionModel.update({'_id': req.params.id}, {$pull: {upvotes: req.data.userId}})
            }
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((Err)=>{
            next()
        })
    }

    static downvote (req,res,next){
        questionModel.findOne({'_id': req.params.id})
        .then((data)=>{
            if(data.downvotes.includes(req.data.userId) == false){
                return questionModel.update({'_id': req.params.id}, 
            {
                $push: {downvotes: req.data.userId},
                $pull: {upvotes: req.data.userId}
            })
            } 
            if(data.downvotes.includes(req.data.userId) == true) {
                return questionModel.update({'_id': req.params.id}, {$pull: {downvotes: req.data.userId}})
            } else {
                next()
            }
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static delete (req,res,next){
        questionModel.deleteOne({'_id': req.params.id, owner: req.data.userId})
        .then((data)=>{
            return answerModel.deleteMany({question: req.params.id})
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static update (req, res, next){
        questionModel.updateOne({'_id': req.params.id, owner: req.data.userId}, req.body)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }
}

module.exports = Question