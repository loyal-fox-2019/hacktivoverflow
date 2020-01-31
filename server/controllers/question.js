const Question = require('../models/question')

class Controller {

    static async create(req, res, next) {
        try {
            const { title, content, tags } = req.body
            let question = await Question.create({ title, content, tags, author: req.decoded.id })
            question = await question.populate('author -password').execPopulate()

            res.status(201).json(question)
        } catch (error) {
            next(error)
        }
    }

    static delete(req, res, next) {
        Question.findByIdAndDelete(req.params.id)
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next);
    }

    static getAllQuestion(req, res, next) {
        Question.find({}, null, { sort: '-createdAt' }).populate('author -password')
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next);
    }

    static getMyQuestion(req, res, next) {
        Question.find({ author: req.decoded.id })
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next);
    }

    static getSingleQuestion(req, res, next) {
        Question.findById(req.params.id).populate('author -password')
            .then((question) => {
                if (!question) throw ({ status: 404, msg: "Question not found" })
                res.status(200).json(question)
            })
            .catch(next);
    }

    static updateQuestion(req, res, next) {
        // console.log(req.body);
        const { title, content, tags } = req.body

        Question.findByIdAndUpdate(req.params.id, {
            title, content, tags
        }, { new: true })
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next);
    }

    static increaseVote(req, res, next) {
        Question.findOne({ _id: req.params.id, upVotes: req.decoded.id })
            .then((result) => {
                if (!result) {
                    return Question.findByIdAndUpdate(req.params.id, {
                        $addToSet: { upVotes: req.decoded.id },
                        $pull: { downVotes: req.decoded.id }
                    }, { new: true }).populate('author -password')
                } else {
                    // console.log(result, 'ini result');
                    return Question.findByIdAndUpdate(req.params.id, {
                        $pull: { upVotes: req.decoded.id }
                    }, { new: true }).populate('author -password')
                }
            })
            .then((question) => {
                console.log(question);
                res.status(200).json(question)
            })
            .catch(next);
    }

    static decreaseVote(req, res, next) {
        Question.findOne({ _id: req.params.id, downVotes: req.decoded.id })
            .then((result) => {
                if (!result) {
                    return Question.findByIdAndUpdate(req.params.id, {
                        $addToSet: { downVotes: req.decoded.id },
                        $pull: { upVotes: req.decoded.id }
                    }, { new: true }).populate('author -password')
                } else {
                    return Question.findByIdAndUpdate(req.params.id, {
                        $pull: { downVotes: req.decoded.id }
                    }, { new: true }).populate('author -password')
                }
            })
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next);
    }
}

module.exports = Controller