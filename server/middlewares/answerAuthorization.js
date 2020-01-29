const AnswerModel = require('../models/answer')

function answerAuthorization(req,res,next){
    AnswerModel.findById(req.params.answerId)
    .then(data=>{
        if(String(data.userId) === String(req.user.userId)){
            next()
        }
        else{
            throw {
                code: 403,
                message: "You are not authorized"
            }
        }
    })
    .catch(err=>{
        res.status(err.code).json({
            message: err.message
        })
    })
}

module.exports = answerAuthorization