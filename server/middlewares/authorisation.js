const Question = require("../models/question.js");
const Answer = require("../models/answer.js");
const User = require("../models/user.js");

function question_authorisation(req,res,next)
{    
    Question.findById(req.params.id)
    .then((question) => {
        if(question.user.toString() != req.userInfo.id)
        {
            res.status(403).json({
                msg: "Not authorised"
            })
        }
        else
        {
            next();
        }
    })
    .catch((err) => {
        console.log(err);
        
    });
}

function answer_authorisation(req,res,next)
{    
    Answer.findById(req.params.id)
    .then((answer) => {
        if(answer.user.toString() != req.userInfo.id)
        {
            res.status(403).json({
                msg: "Not authorised"
            })
        }
        else
        {
            next();
        }
    })
    .catch((err) => {
        console.log(err);
        
    });
}

function user_authorisation(req,res,next)
{    
    User.findById(req.userInfo.id)
    .then((user) => {
        if(!user)
        {
            res.status(404).json({
                msg: "Account not found"
            })
        }
        else
        {
            next();
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = {
    question_authorisation,
    answer_authorisation,
    user_authorisation
};
