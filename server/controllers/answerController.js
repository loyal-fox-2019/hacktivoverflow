const Answer = require('../models/answer')
const Question = require('../models/question')
const mongoose = require('mongoose')

class answerController {
    static create ( req,res,next ) {
        Answer.create({
            description:req.body.description,
            question:req.body.questionId,
            votes:[],
            author:mongoose.Types.ObjectId(req.decoded.id)
        })
            .then(answer=>{
                res.status(201).json(answer)
                return Question.updateOne({_id:req.body.questionId},{
                    $push:{ answers : answer._id }
                })
            })
            .then(result => res.status(201).json(result))
            .catch(next)
    }

    static getOne ( req,res,next ) {
        Answer.find({question:req.params.questionId})
            .populate('question')
            .populate('author')
            .then(answers=>{
                console.log(answers)
                answers.coba = 'ayam'
                res.status(200).json(answers)
            })
            .catch((err)=>{
                console.log(err);
                next(err)
                
            })
    }

    static get ( req,res,next ) {
        Answer.find({})
            .populate('question')
            .populate('author')
            .then(answers=>{
                console.log(answers)
                answers.coba = 'ayam'
                res.status(200).json(answers)
            })
            .catch((err)=>{
                console.log(err);
                next(err)
                
            })
    }

    static update ( req,res,next ) {
        Answer.updateOne({_id:req.params.id},{
            description:req.body.description
        })
        .then(result=>res.status(201).json(result))
        .catch(next)
    }

    static delete ( req,res,next ) {
        Answer.deleteOne({_id:req.params.id})
        .then(result=>{
            res.status(201).json(result)
            return Question.updateOne({_id:req.body.questionId},{
                $pull:{ answers : mongoose.Types.ObjectId(req.body.id)}
            })
        })
        .then(()=>console.log('answer removed'))
        .catch(next)
    }

    static vote(req,res,next){
        Answer.findOne({_id:req.params.id})
        .then(answer=>{
            let found = false
            let votes = answer.votes
            for(let vote of votes){
                if(vote.userId===req.decoded.id){
                    found = true
                    if(vote.vote===req.body.vote){
                        return Answer.updateOne({_id:req.params.id},{
                            $pull:{votes:{userId:req.decoded.id}}
                        })
                    }else{
                        return Answer.updateOne({'votes.userId':req.decoded.id},{
                            'votes.$.vote':req.body.vote
                        })
                    }   
                }
            }
            if(found===false){
                return Answer.updateOne({_id:req.params.id},{
                    $push:{votes:{userId:req.decoded.id,vote:req.body.vote}}
                })
            }
        })
        .then(answer=>res.status(201).json(answer))
        .catch(next)
    }
}

module.exports = answerController