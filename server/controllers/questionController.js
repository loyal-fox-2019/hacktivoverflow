const Question = require("../models/question.js");

class QuestionController
{
    static getAllQuestions(req, res, next)
    {
        Question.find()
        .populate('answers')
        .exec()
        .then((questions) => {
            res.status(200).json(questions)
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static getOneQuestion(req, res, next)
    {
        Question.findById(req.params.id)
        .populate('answers')
        .exec()
        .then((question) => {
            res.status(200).json(question)
        })
        .catch((err) => {
            console.log(err);            
        });
    }
}

module.exports = QuestionController;