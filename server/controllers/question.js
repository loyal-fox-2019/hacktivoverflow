const question = require('../models/question')

class QuestionCtr {
    static create(req,res,next){
        req.body.user_id = req.user._id
        console.log(req.user)
        req.body.upVotes = undefined
        question.create(req.body)
                .then(question => {
                    res.status(201).json({
                        message: "new Question created!",
                        question
                    })
                })
                .catch(next)
    }
    static getQuestions(req,res,next){
        question.find()
                .populate('user_id')
                .then(questions => {
                    res.status(200).json(questions)
                })
                .catch(next)
    }
    static findOne(req,res,next){
        question.findOne({_id: req.params.id})
                .then(question => {
                    res.status(200).json(question)
                })
                .catch(next)
    }
    static myQuestion(req,res,next){
        question.find({
            user_id: req.user._id
        })
                .then(data=>{
                    res.status(200).json(data)
                })
                .catch(next)
    }
    static edit(req,res,next){
        let id = req.params.id
        question.updateOne({_id: id},req.body)
                .then(updated =>{
                    res.status(200).json({
                        message: "updated successfully!",
                        updated
                    })
                })
                .catch(next)
    }
    static upVote(req,res,next){
        question.findOne({_id: req.params.id})
                .then(data=>{
                    let upVotes = data.upVotes
                    let downVotes = data.downVotes
                    if(upVotes.indexOf(req.user._id) === -1){
                        upVotes.push(req.user._id)
                        if(downVotes.indexOf(req.user._id) !== 1){
                            downVotes.splice(downVotes.indexOf(req.user._id),1)
                        }
                    }else{
                        upVotes.splice(upVotes.indexOf(req.user._id),1)
                    }
                    return question.updateOne({_id: req.params.id},{upVotes:upVotes,downVotes:downVotes})
                    .then(data=>{
                        res.status(200).json(data)
                    })
                    .catch(next)
                })
                .catch(next)
    }
    static downVote(req,res,next){
        question.findOne({_id: req.params.id})
                .then(data=>{
                    let upVotes = data.upVotes
                    let downVotes = data.downVotes
                    if(downVotes.indexOf(req.user._id) === -1){
                        downVotes.push(req.user._id)
                        if(upVotes.indexOf(req.user._id) !== 1){
                            upVotes.splice(downVotes.indexOf(req.user._id),1)
                        }
                    }else{
                        downVotes.splice(upVotes.indexOf(req.user._id),1)
                    }
                    return question.updateOne({_id: req.params.id},{upVotes:upVotes,downVotes:downVotes})
                    .then(data=>{
                        res.status(200).json(data)
                    })
                    .catch(next)
                })
                .catch(next)
    }
    static delete(req, res, next) {
        let id = req.params.id

        qusetion.findByIdAndDelete(id)
        .then((deletedQusetion) => {
            if (deletedQusetion !== null) {
                res.status(200).json({
                    message: "Qusetion deleted successfully!",
                    deletedQusetion
                })
            } else {
                res.status(400).json({
                    message: "Qusetion not found!"
                })
            }
        })
        .catch(next)
    }

}

module.exports = QuestionCtr