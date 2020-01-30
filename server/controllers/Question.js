"use strict"

const Questions = require('../models/Questions')

class questionControllers {
    static findAll(req, res, next) {
        Questions.find()
            .sort({ createdAt: 'desc' })
            .populate('answers')
            .populate('user')
            .then((questions) => {
                if (questions) {
                    res.status(200).json(questions)
                } else {
                    res.status(404).json({ message: "No found question" })
                }
            })
            .catch(next)
    }
    static findOne(req, res, next) {
        Questions.findOne({
            _id: req.params.id
        })
            .populate('answers')
            .populate('user')
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next)
    }
    static create(req, res, next) {
        const { title, description } = req.body
        console.log(description);
        Questions.create({
            title,
            description,
            user: req.user._id
        })
            .then((question) => {
                res.status(201).json(question)
            })
            .catch((err) => {
                next(err)
            })
    }
    static upVote(req, res, next) {
        Questions.findByIdAndUpdate({
            _id: req.params.id
        }, { $pull: { dow: req.user._id } }, { new: true })
            .then((question) => {
                if (!question.downvote.includes(req.user._id)) {
                    if (!question.upvote.includes(req.user._id)) {
                        question.upvote.push(req.user._id)
                        return Questions.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            upvote: question.upvote
                        }, { new: true }).populate('answers').populate('user')
                    } else {
                        return Questions.findOneAndUpdate({
                            _id: req.params.id
                        }, { $pull: { upvote: req.user._id } }, { new: true }).populate('answers').populate('user')
                    }
                } else {
                    if (!question.upvote.includes(req.user._id)) {
                        question.upvote.push(req.user._id)
                        return Questions.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            upvote: question.upvote
                        }, { new: true }).populate('answers').populate('user')
                            .then((question) => {
                                return Questions.findOneAndUpdate({
                                    _id: req.params.id
                                }, { $pull: { downvote: req.user._id } }, { new: true }).populate('answers').populate('user')
                            }).catch((err) => {
                                next(err)
                            });
                    } else {
                        return Questions.findOneAndUpdate({
                            _id: req.params.id
                        }, { $pull: { upvote: req.user._id } }, { new: true }).populate('answers').populate('user')
                    }
                }
            })
            .then(question => {
                res.status(200).json(question)
            }).catch((err) => {
                next(err)
            });
    }
    static downVote(req, res, next) {
        Questions.findByIdAndUpdate({
            _id: req.params.id
        }, { $pull: { dow: req.user._id } }, { new: true })
            .then((question) => {
                if (!question.upvote.includes(req.user._id)) {
                    if (!question.downvote.includes(req.user._id)) {
                        question.downvote.push(req.user._id)
                        return Questions.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            downvote: question.downvote
                        }, { new: true }).populate('answers').populate('user')
                    } else {
                        return Questions.findOneAndUpdate({
                            _id: req.params.id
                        }, { $pull: { downvote: req.user._id } }, { new: true }).populate('answers').populate('user')
                    }
                } else {
                    if (!question.downvote.includes(req.user._id)) {
                        question.downvote.push(req.user._id)
                        return Questions.findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            downvote: question.downvote
                        }, { new: true }).populate('answers').populate('user')
                            .then((question) => {
                                return Questions.findOneAndUpdate({
                                    _id: req.params.id
                                }, { $pull: { upvote: req.user._id } }, { new: true }).populate('answers').populate('user')
                            }).catch((err) => {
                                next(err)
                            });
                    } else {
                        return Questions.findOneAndUpdate({
                            _id: req.params.id
                        }, { $pull: { downvote: req.user._id } }, { new: true }).populate('answers').populate('user')
                    }
                }
            })
            .then(question => {
                res.status(200).json(question)
            }).catch((err) => {
                next(err)
            });
    }
    static delete(req, res, next) {
        Questions.findOneAndDelete({
            _id: req.params.id
        })
            .then((question) => {
                res.status(200).json(question)
            }).catch((err) => {
                next(err)
            });
    }
}

module.exports = questionControllers