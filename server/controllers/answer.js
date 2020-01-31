const Answer = require('../models/answer')
const Question = require('../models/question')

class Controller {

    static getAll(req, res, next) {
        Answer.find().populate('author -password')
            .then((answer) => {
                res.status(200).json(answer)
            })
            .catch(next);
    }

    static async createAnswer(req, res, next) {
        try {
            const { content } = req.body
            let answer = await Answer.create({ content, question: req.params.id, author: req.decoded.id })
            answer = await answer.populate('author -password').execPopulate()

            let question = await Question.findByIdAndUpdate(req.params.id, { $push: { answer: answer._id } })

            res.status(201).json(answer)
        } catch (error) {
            next(error)
        }
    }

    static showQuestionAnswers(req, res, next) {
        Answer.find({ question: req.params.id }).populate('author -password')
            .then((answer) => {
                res.status(200).json(answer)
            })
            .catch(next);
    }

    static updateAnswer(req, res, next) {
        Answer.findByIdAndUpdate(req.params.id, {
            content: req.body.content,
        }, { new: true }).populate('author -password')
            .then((answer) => {
                res.status(200).json(answer)
            })
            .catch(next);
    }

    static increaseVote(req, res, next) {
        Answer.findOne({ _id: req.params.id, upVotes: req.decoded.id })
            .then((result) => {
                if (!result) {
                    return Answer.findByIdAndUpdate(req.params.id, {
                        $addToSet: { upVotes: req.decoded.id },
                        $pull: { downVotes: req.decoded.id }
                    }, { new: true }).populate('author -password')
                } else {
                    return Answer.findByIdAndUpdate(req.params.id, {
                        $pull: { upVotes: req.decoded.id }
                    }, { new: true }).populate('author -password')
                }
            })
            .then((answer) => {
                res.status(200).json(answer)
            })
            .catch(next);
    }

    static decreaseVote(req, res, next) {
        Answer.findOne({ _id: req.params.id, downVotes: req.decoded.id })
            .then((result) => {
                if (!result) {
                    return Answer.findByIdAndUpdate(req.params.id, {
                        $addToSet: { downVotes: req.decoded.id },
                        $pull: { upVotes: req.decoded.id }
                    }, { new: true }).populate('author -password')
                } else {
                    return Answer.findByIdAndUpdate(req.params.id, {
                        $pull: { downVotes: req.decoded.id }
                    }, { new: true }).populate('author -password')
                }
            })
            .then((answer) => {
                res.status(200).json(answer)
            })
            .catch(next);
    }
}

module.exports = Controller