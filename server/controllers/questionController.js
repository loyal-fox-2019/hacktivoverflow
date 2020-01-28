const Question = require("../models/question.js");
const _ = require("underscore");

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
            if(question)
            {
                res.status(200).json(question);
            }
            else
            {
                res.status(404).json({
                    msg: "Question not found."
                });
            }
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static addNewQuestion(req, res, next)
    {
        const data = _.pick(req.body,'title','description');
        data.user = req.userInfo.id;
        data.upvotes = [];
        data.downvotes = [];
        data.answers = [];
        data.tags = req.body.tags.split(' ').filter((v) => {return !!v});

        Question.create(data)
        .then((question) => {
            res.status(201).json(question);
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static updateQuestion(req, res, next)
    {
        const data = _.pick(req.body,'title','description');
        data.tags = req.body.tags.split(' ').filter((v) => {return !!v});

        Question.findById(req.params.id)
        .populate('answers')
        .exec()
        .then((question) => {
            if(question)
            {
                for(let key in question)
                {
                    if(data.hasOwnProperty(key))
                    {
                        question[key] = data[key];
                    }
                }

                return question.save();
            }
            else
            {
                res.status(404).json({
                    msg: "Question not found."
                });
            }
        })
        .then(() => {
            res.status(201).json({
                msg: "Update success."
            });
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static deleteQuestion(req, res, next)
    {
        Question.findByIdAndDelete(req.params.id)
        .exec()
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            res.status(404).json({
                msg: "Product not found."
            })
        })
    }
}

module.exports = QuestionController;