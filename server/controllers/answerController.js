const AnswerModel = require('../models/answer')

class AnswerController {
    static vote(req,res,next){
        AnswerModel.findById(req.params.answerId)
        .then(found=>{
            if(!found){
                throw{
                    code: 404,
                    message: "Answer not found"
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
                    return AnswerModel.findByIdAndUpdate(req.params.answerId, {
                        $push: {
                            votes: {
                                userId: req.user.userId,
                                value: req.body.value
                            }
                        }
                    })
                }
                else {
                    return AnswerModel.findByIdAndUpdate(req.params.answerId, {votes: newVotes})
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
        AnswerModel.findByIdAndUpdate(req.params.answerId, req.body)
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

    static create(req,res,next){
        let {title, description, questionId} = req.body
        AnswerModel.create({
            title,
            description,
            questionId,
            userId: req.user.userId,
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

    static findByQuestionId(req,res,next){
        AnswerModel.find({
            questionId: req.params.questionId
        }).populate('userId')
        .then(datas=>{
            res.status(200).json(datas)
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

module.exports = AnswerController