const question = require('../models/question')
const answer = require('../models/answer')

class QuestionCon {
    static add(req,res,next){
        req.body.idUser = req.user._id
        req.body.upVotes = undefined

        if(req.body.tags.length > 0){
            const str = req.body.tags
            const arr = str.split(',')
            req.body.tags = arr
        }

        question.create(req.body)
            .then(data=>{
                res.status(201).json(data)
            })
            .catch(next)
    }
    static findAll(req,res,next){
        question.find()
        .populate('idUser')
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(next)
    }
    static findOne(req,res,next){
        question.findOne({_id: req.params.id})
                .then(data =>{
                    res.status(200).json(data)
                })
                .catch(next)
    }
    static myQuestion(req,res,next){
        question.find({
            idUser: req.user._id
        })
                .then(data=>{
                    res.status(200).json(data)
                })
                .catch(next)
    }
    static update(req,res,next){
        question.updateOne({_id: req.params.id},req.body)
            .then(respone =>{
                res.status(200).json(respone)
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
    static destroy(req,res,next){
        question.deleteOne({_id:req.params.id})
            .then(()=>{
                return answer.deleteMany({
                    idQuestion:req.params.id
                })
            })
            .then(respone =>{
                res.status(200).json(respone)
            })
            .catch(next)
    }

}

module.exports = QuestionCon