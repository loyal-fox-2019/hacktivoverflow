const answer = require('../models/answer')

class AnswerCtr {
    static create(req,res,next){
        req.body.idUser = req.user._id
        answer.create(req.body)
        .then(answer => {
            res.status(201).json({
                message: "new Answer created!",
                answer
            })
        })
            .catch(next)
    }
    static getAnswers(req,res,next){
        answer.find({idQuestion : req.params.id})
            .populate('idUser')
            .then(answers =>{
                res.status(200).json(answers)
            })
            .catch(next)
    }
    static myAnswer(req,res,next){
        answer.find({idUser : req.user._id})
            .then(answer =>{
                res.status(200).json(answer)
            })
            .catch(next)
    }
    static edit(req,res,next){
        let id = req.params.id
        answer.updateOne({_id: id},req.body)
            .then(updated =>{
                res.status(200).json({
                    message: "updated successfully!",
                    updated
                })
            })
            .catch(next)
    }
    static upVote(req,res,next){
        let id = req.params.id
        answer.findOne({_id: id})
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
                return answer.updateOne({_id: req.params.id},{upVotes:upVotes,downVotes:downVotes})
                .then(data=>{
                    res.status(200).json(data)
                })
                .catch(next)
            })
            .catch(next)
    }
    static downVote(req,res,next){
        let id = req.params.id
        answer.findOne({_id: id})
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
                return answer.updateOne({_id: req.params.id},{upVotes:upVotes,downVotes:downVotes})
                .then(data=>{
                    res.status(200).json(data)
                })
                .catch(next)
            })
            .catch(next)
    }
}

module.exports = AnswerCtr