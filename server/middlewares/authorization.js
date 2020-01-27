const Question = require('../models/question')

module.exports = (req,res,next)=>{
    if(req.params.hasOwnProperty('postId')){
        Question.findOne({_id: req.params.quesriontId})
        .then(question=>{
            if(req.payload._id == question.UserId){
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