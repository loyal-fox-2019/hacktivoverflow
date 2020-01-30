const modelAnswer = require("../models/modelAnswer.js")

class ControlAnswer {
    static createAnswer(req, res) {
        modelAnswer.create({
            title: req.body.title,
            description: req.body.description,
            upvote: [],
            downvote: [],
            userId: req.payload.id,
            questionId: req.params.questionId
        })
            .then(answer => {
                res.status(201).json(answer)
            })
            .catch(err => {
                console.log(err, "gagal post question")
                res.status(500).json({ err, message: "internal server error" })
            })
    }

    static editAnswer(req, res) {
        modelAnswer.findByIdAndUpdate(req.params.answerId, req.body)
            .then((updated) => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json({ err, message: "internal server error" })
            })
    }
    static upvoteAnswer(req, res) {
        modelAnswer.findByIdAndUpdate(req.params.id,
            {
                $addToSet: {
                    upvote: req.payload.id
                },
                $pull: {
                    downvote: req.payload.id
                }
            })
            .then(upvoted => {
                res.status(200).json(upvoted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static downvoteAnswer(req, res) {
        modelAnswer.findByIdAndUpdate(req.params.id, {
            $addToSet: {
                downvote: req.payload.id
            },
            $pull: {
                upvote: req.payload.id
            }
        })
            .then(downvoted => {
                res.status(200).json(downvoted)
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }
}

module.exports = ControlAnswer