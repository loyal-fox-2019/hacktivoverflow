const Answer = require('../models/answer')

class AnswerController{
    static create(req,res){
        Answer.create({
            title: req.body.title,
            description: req.body.description,
            user: req.payload._id,
            question: req.body.questionId,
            upvotes: [],
            downvotes: []
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    }
    static findAll(req,res){
        Answer.find({user: req.payload._id}).populate('user', '-password')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    }
    static findOne(req,res){
        Answer.findById({_id: req.params.answerId}).populate('user', '-password')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    }
    static update(req,res){
        Answer.findByIdAndUpdate({_id: req.params.answerId}).populate('user', '-password')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({
                message:err.message
            })
        })
    }
    static delete(req,res){
        Answer.findByIdAndDelete({_id: req.params.answerId})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    }
    static upvote(req,res){
        Answer.findByIdAndUpdate({_id: req.params.questionId},{
            $addToSet: { upvotes: req.payload._id },
            $pull: {downvotes: req.payload._id}
        }, { new: true }).populate('user','-password')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    }
    static downvote(req,res){
        Answer.findByIdAndUpdate({_id: req.params.questionId},{
            $addToSet: { downvotes: req.payload._id },
            $pull: {upvotes: req.payload._id}
        }, { new: true }).populate('user','-password')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    }
}

module.exports = AnswerController