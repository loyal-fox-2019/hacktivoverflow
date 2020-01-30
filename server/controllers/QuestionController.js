const Question = require('../models/question')

class QuestionController{
    static create(req,res){
        Question.create({
            title: req.body.title,
            description: req.body.description,
            user: req.payload._id,
            tags: req.body.tags,
            picture: req.body.picture,
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
        Question.find().populate('user', '-password').sort( { createdAt: -1 } )
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    }
    static findAllUser(req,res){
        Question.find({user: req.payload._id}).populate('user', '-password')
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
        Question.findById({_id: req.params.questionId}).populate('user', '-password')
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
        console.log('masuk update question', req.params, req.body)
        Question.findByIdAndUpdate({_id: req.params.questionId},{
            title: req.body.title,
            description: req.body.description,
            picture: req.body.picture
        }).populate('user', '-password')
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
        console.log('masuk delete question', req.params)
        Question.findByIdAndDelete({_id: req.params.questionId})
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
        Question.findById({_id: req.params.questionId})
        .then(data=>{
            if(data.upvotes.includes(req.payload._id)){
                return Question.findByIdAndUpdate({_id: req.params.questionId},{
                    $pull: {upvotes: req.payload._id}
                }, { new: true }).populate('user','-password')
            }else{
                return Question.findByIdAndUpdate({_id: req.params.questionId},{
                    $addToSet: { upvotes: req.payload._id },
                    $pull: {downvotes: req.payload._id}
                }, { new: true }).populate('user','-password')
            }
        })
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
        Question.findById({_id: req.params.questionId})
        .then(data=>{
            if(data.downvotes.includes(req.payload._id)){
                return Question.findByIdAndUpdate({_id: req.params.questionId},{
                    $pull: {downvotes: req.payload._id}
                }, { new: true }).populate('user','-password')
            }else{
                return Question.findByIdAndUpdate({_id: req.params.questionId},{
                    $addToSet: { downvotes: req.payload._id },
                    $pull: {upvotes: req.payload._id}
                }, { new: true }).populate('user','-password')
            }
        })
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

module.exports = QuestionController