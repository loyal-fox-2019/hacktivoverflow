const QuestionModel = require('../models/question')

function questionAuthorization(req,res,next){
    QuestionModel.findById(req.params.questionId)
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

module.exports = questionAuthorization