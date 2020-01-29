const Question = require('../models/Question')
const Answer = require('../models/Answer')

class AnswerController {
    static create(req, res, next){
        const { content } = req.body
        let answer;
        // console.log(req.params)
        Answer  
            .create({
                content,
                author: req.userId
            })
            .then(resAnswer => {
                answer = {
                    _id: resAnswer._id,
                    author: req.userId,
                    content: resAnswer.content,
                    question: req.params.questionId
                }
                console.log(req.params.questionId)
                return Question
                        .updateOne({_id: req.params.questionId}, {
                            $push: {
                                answers: [answer._id]
                            }
                        })
            })
            .then(() => {
                res.status(201).json(answer)
            })
            .catch(next)
    }

    static get(req, res, next){
        Answer
            .findOne({
                _id: req.params.id
            })
            .populate('author')
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(next)   
    }

    static getAll(req, res, next){
        Answer
            .find({
                author: req.userId
            })
            .populate('author')
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(next)
    }

    static update(req, res, next){
        const { content } = req.body
        Answer  
            .updateOne({_id: req.params.id},{
                content
            })
            .then(() => {
                next()
            })
            .catch(next)
    }

    static delete(req, res, next){
        Answer
            .deleteOne({
                _id: req.params.id
            })
            .then(answer => {
                return Question
                            .updateOne({ _id: req.params.questionId }, {
                                $pullAll: {
                                    answers: [req.params.id]
                                }
                            })
            })
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next)   
    }

}
module.exports = AnswerController