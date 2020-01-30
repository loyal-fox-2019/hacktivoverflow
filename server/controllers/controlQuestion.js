const modelQuestion = require("../models/modelQuestions.js")
const modelAnswer = require("../models/modelAnswer.js")

class ControlQuestion {
    static askQuestion(req, res) {
        modelQuestion.create({
            title: req.body.title,
            description: req.body.description,
            upvote: [],
            downvote: [],
            userId: req.payload.id,
            tag: req.body.tag
        })
            .then(questionPosted => {
                res.status(200).json(questionPosted)
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error" })
            })
    }

    static editQuestion(req, res) {
        // console.log("masuk sini kok")
        modelQuestion.findByIdAndUpdate(req.params.id, req.body)
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {

                // console.log(err, "ini kegagalan")
                res.status(500).json({ err, message: "Internal server error" })
            })

    }

    static allQuestion(req, res) {
        modelQuestion.find().populate('userId')
            .then(allQuestion => {
                res.status(200).json(allQuestion)
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal server error" })
            })
    }

    static deleteQuestion(req, res) {
        modelAnswer.deleteMany({ questionId: req.params.id })
            .then(() => {
                return modelQuestion.findByIdAndDelete(req.params.id)
            })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                console.log(err)
            })
        // modelQuestion.findByIdAndDelete(req.params.id)
        //     .then(() => {
        //         res.status(200).json({ message: "Question deleted" })
        //     })
        //     .catch(err => {
        //         res.status(500).json({ err, message: "Internal Server Error" })
        //     })
    }

    static getAllAnswerOfThisQuestion(req, res) {
        modelAnswer.find()
            .populate("questionId").populate("userId", 'username')
            .then(allAnswers => {
                let mine = []
                for (let i of allAnswers) {
                    if (i.questionId._id == req.params.id) {
                        mine.push(i)
                    }
                }
                res.status(200).json(mine)
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error" })
            })
    }

    static upvoteQuestion(req, res) {
        modelQuestion.findByIdAndUpdate(req.params.id,
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

    static downvoteQuestion(req, res) {
        modelQuestion.findByIdAndUpdate(req.params.id, {
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

    static getQuestionById(req, res) {
        modelQuestion.findById(req.params.id).populate('userId')
            .then(questionFound => {
                if (questionFound) {

                    res.status(200).json(questionFound)
                } else {
                    throw ({ code: 404, message: "question not found" })
                }
            })
            .catch(err => {
                res.status(500).json({ err, message: "internal server error" })
            })
    }

    static findByTitle(req, res) {
        modelQuestion.find({ title: new RegExp(req.params.title, "i") })
            .then(allFound => {
                res.status(200).json(allFound)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static searchByTag(req, res) {
        modelQuestion.find({ tag: new RegExp(req.params.tag, "i") })
            .then(dataTags => {
                res.status(200).json(dataTags)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = ControlQuestion