const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports = (req,res,next)=>{
    console.log('auth==============', req.params)
    if(req.params.hasOwnProperty('questionId')){
        Question.findOne({_id: req.params.questionId})
        .then(question=>{
            console.log(req.payload._id,'=====', question.user)
            if(req.payload._id == question.user){
                console.log('ga nyangkut')
                next()
            }else{
                res.status(401).json({
                    message: 'You are not authorized'
                })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({
                message: err.message
            })
        })
    }else if(req.params.hasOwnProperty('answerId')){
        console.log('masuk auth')
        Answer.findOne({_id: req.params.answerId})
        .then(answer=>{
            console.log(answer)
            console.log(req.payload._id,'=====', answer)
            if(req.payload._id == answer.user){
                console.log('ga nyangkut')
                next()
            }else{
                res.status(401).json({
                    message: 'You are not authorized'
                })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({
                message: err.message
            })
        })
    }
}