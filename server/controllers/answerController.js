const Answer = require('../models/answerModel');

class AnswerController{
    static create(req,res,next){
        console.log(req.body)
        Answer.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
            console.log(err)
        })
    }

    static getAllById(req,res,next){
        Answer.find({
            QuestionId : {
                $elemMatch : { $in : req.params._id}
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static findAll(req,res,next){
        Answer.find()
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static edit(req,res,next){
        Answer.findOneAndUpdate({
            _id : req.body._id-answer
        },req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static delete(req,res,next){
        Answer.deleteOne({
            _id : req.body._id-answer
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
}

module.exports = AnswerController