"use strict"

const Answer = require('../models/Answers')
const Questions = require('../models/Questions')

class answersControllers {
    static create(req, res, next) {
        const { description } = req.body
        let questionData = null
        Questions.findOne({
            _id: req.params.idQuestion
        }).populate('answers')
            .then(question => {
                questionData = question
                return Answer.create({
                    description, user: req.user._id, username: req.user.username, question: questionData._id
                })
            })
            .then(answer => {
                questionData.answers.push(answer._id)
                return Questions.findOneAndUpdate({
                    _id: req.params.idQuestion
                }, { answers: questionData.answers }, { new: true }).populate('answers').populate('user')
            })
            .then(answer => {
                res.status(201).json(answer)
            })
            .catch(next)
    }
    static update(req, res, next) {
        Answer.findByIdAndUpdate({
            _id: req.params.id
        }, { description: req.body.description })
            .then(answer => {
                return Questions.findOne({
                    _id: answer.question
                }).populate('answers').populate('user')
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }
    static upVote(req, res, next) {
        Answer.findByIdAndUpdate({
            _id: req.params.id
        }, { $pull: { dow: req.user._id } }, { new: true })
            .then((question) => {
                if (!question.upvote.includes(req.user._id)) {
                    question.upvote.push(req.user._id)
                    return Answer.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        upvote: question.upvote
                    }, { new: true }).populate('answers').populate('user')
                } else {
                    return Answer.findOneAndUpdate({
                        _id: req.params.id
                    }, { $pull: { upvote: req.user._id } }, { new: true }).populate('answers').populate('user')
                }
            })
            .then(question => {
                res.status(200).json(question)
            }).catch((err) => {
                next(err)
            });
    }
    static downVote(req, res, next) {
        Answer.findByIdAndUpdate({
            _id: req.params.id
        }, { $pull: { dow: req.user._id } }, { new: true })
            .then((question) => {
                if (!question.downvote.includes(req.user._id)) {
                    question.downvote.push(req.user._id)
                    return Answer.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        downvote: question.downvote
                    }, { new: true }).populate('answers').populate('user')
                } else {
                    return Answer.findOneAndUpdate({
                        _id: req.params.id
                    }, { $pull: { downvote: req.user._id } }, { new: true }).populate('answers').populate('user')
                }
            })
            .then(question => {
                res.status(200).json(question)
            }).catch((err) => {
                next(err)
            });
    }
}

module.exports = answersControllers