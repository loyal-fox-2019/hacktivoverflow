const QuestionModel = require('../models/question')
const AnswerModel = require('../models/answer')

class QuestionController {
    static vote(req,res,next){
        QuestionModel.findById(req.params.questionId)
        .then(found=>{
            if(req.body.value !== 1 && req.body.value !== 0 && req.body.value !== -1) {
                throw {
                    code: 400,
                    message: "Invalid vote value"
                }
            }
            if(!found){
                throw{
                    code: 404,
                    message: "Question not found"
                }
            }
            else {
                let inVotes = false
                let newVotes = found.votes
                for(let obj of newVotes){
                    if(String(obj.userId) === String(req.user.userId)){
                        obj.value = req.body.value
                        inVotes = true
                        break
                    }
                }
                if(!inVotes){
                    return QuestionModel.findByIdAndUpdate(req.params.questionId, {
                        $push: {
                            votes: {
                                userId: req.user.userId,
                                value: req.body.value
                            }
                        }
                    })
                }
                else {
                    return QuestionModel.findByIdAndUpdate(req.params.questionId, {votes: newVotes})
                }
            }
        })
        .then(updated=>{
            res.status(200).json({
                message: "Vote submitted"
            })
        })
        .catch(err=>{
            res.status(err.code).json({
                message: err.message
            })
        })
    }

    static update(req,res,next){
        QuestionModel.findByIdAndUpdate(req.params.questionId, req.body)
        .then(updated=>{
            res.status(200).json(updated)
        })
        .catch(err=>{
            let errors = []
            for(let key in err.errors){
                errors.push(err.errors[key].message)
            }
            res.status(400).json({errors})
        })
    }

    static delete(req,res,next){
        AnswerModel.deleteMany({
            questionId: req.params.questionId
        })
        .then(()=>{
            return QuestionModel.findByIdAndDelete(req.params.questionId)
        })
        .then(deleted=>{
            res.status(200).json(deleted)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static create(req,res,next){
        let { title, description } = req.body
        QuestionModel.create({
            title,
            description,
            userId: req.user.userId
        })
        .then(created=>{
            res.status(201).json(created)
        })
        .catch(err=>{
            let errors = []
            for(let key in err.errors){
                errors.push(err.errors[key].message)
            }
            res.status(400).json({errors})
        })
    }

    static getAll(req,res,next){
        QuestionModel.find().sort({created_at: -1}).populate('userId')
        .then(results=>{
            res.status(200).json(results)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static getById(req,res,next){
        QuestionModel.findById(req.params.questionId).populate('userId')
        .then(result=>{
            if(!result){
                throw {
                    code: 404,
                    message: "Question not found"
                }
            }
            else {
                res.status(200).json(result)
            }
        })
        .catch(err=>{
            res.status(err.code).json({
                message: err.message
            })
        })
    }
}

module.exports = QuestionController