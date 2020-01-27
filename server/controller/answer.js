const answer = require('../models/answer');
const question = require('../models/question');

class controllerAnswer {
    static create(req, res, next) {
        question.findById(
            req.body.question
        ).then(response => {
            if (!response) throw({code: 400, errmsg: "Question not found"});
            return answer.create({
                question: req.body.question,
                description: req.body.description,
                user: req._id
            })
        }).then(response => {
            return question.findByIdAndUpdate(
                req.body.question,
                {
                    "$push": {
                        answer: response._id
                    }
                })
        }).then(response => {
            res.status(201).json({
                message: "Answer successfully created",
                data: response
            })
        }).catch(next)
    }

    static view(req, res, next) {
        answer.find({
            user: req._id
        }).populate(
            'user', 'name'
        ).then(response => {
            res.status(201).json({
                data: response
            })
        }).catch(next)
    }

    static delete(req, res, next) {
        answer.findByIdAndDelete(
            req.params.id
        ).then(response => {
            if (!response) throw({code: 400, errmsg: "Answer not found"});
            res.status(201).json({
                message: "Answer successfully deleted",
                data: response
            })
        }).catch(next)
    }
}

module.exports = controllerAnswer;