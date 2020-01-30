const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');

class QuestionController {
    static create(req,res,next){
        console.log(req.body)
        Question.create(req.body)
        .then( response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err)
            next(500)
        })
    }

    static findAll(req,res,next){
        Question.find()
        .then( response => {
            res.status(201).json(response)
        })
        .catch(err => {
            next(500)
        })
    }

    static findOne(req,res,next){
        if(!req.params){
            next(400)
            return
        }
        
        Question.findOne({
            _id : req.params._id
        })
        .then( questionRes => {
            Answer.find({
                QuestionId : {
                    $elemMatch : { $in : req.params._id}
                }
            })
            .then(answers => {
                res.status(200).json({question : questionRes, answers : answers})
            })
            .catch(err => {
                res.status(400).json(err)
            })
        })
        .catch(err => {
            next(500)
        })
    }

    static edit(req,res,next){
        if(!req.params){
            next(400)
            return
        }

        Question.findOneAndUpdate({
            _id : req.params._id
        },{
            title : req.body.title,
            content : req.body.content,
            author : req.body.author,
            tags : req.body.tags
        })
        .then( response => {
            res.status(201).json({message : 'updated successfully'})
        })
        .catch(err => {
            next(500)
        })
    }

    static delete(req,res,next){
        Question.deleteOne({
            _id : req.params._id
        })
        .then( response => {
            res.status(201).json({message : 'deleted successfully', response})
        })
        .catch(err => {
            next(500)
        })
    }
}

module.exports = QuestionController