const answerModel = require('../models/answer-model')

class Answer{
    static find(req,res,next){
        answerModel.find({question: req.params.id})
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static create(req,res,next){
        let input = {
            title: req.body.title,
            description: req.body.description,
            owner: req.data.userId,
            question: req.body.question,
            created: new Date ()
        }
        answerModel.create(input)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
            next({errorCode: 400, message: err})
        })
    }

    static upvote(req,res,next){
        answerModel.findOne({'_id': req.params.id})
        .then((data)=>{
            if(data.upvotes.includes(req.data.userId) == false){
                return answerModel.update({'_id': req.params.id}, 
                {
                    $push: {upvotes: req.data.userId},
                    $pull: {downvotes: req.data.userId}
                })
            } 
            if(data.upvotes.includes(req.data.userId) == true) {
                return answerModel.update({'_id': req.params.id}, {$pull: {upvotes: req.data.userId}})
            }
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static downvote(req,res,next){
        answerModel.findOne({'_id': req.params.id})
        .then((data)=>{
            if(data.downvotes.includes(req.data.userId) == false){
                return answerModel.update({'_id': req.params.id}, 
            {
                $push: {downvotes: req.data.userId},
                $pull: {upvotes: req.data.userId}
            })
            } 
            if(data.downvotes.includes(req.data.userId) == true) {
                return answerModel.update({'_id': req.params.id}, {$pull: {downvotes: req.data.userId}})
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

    static update (req,res,next){
        answerModel.updateOne({'_id': req.params.id, owner: req.data.userId}, req.body)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

}

module.exports = Answer