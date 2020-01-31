'use strict'

const answerModel = require('../models/answer')

class AnswerController {
    static getAll(req, res, next) {
        const { questionId } = req.params

        answerModel.find({
            questionId: questionId
        })
            .then(answers => {
                res.status(200).json({
                    message: 'success',
                    answers
                })
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { userID } = req.user
        const { questionId } = req.params
        const { answer } = req.body

        const newAnswerData = {
            owner: userID,
            questionId: questionId,
            content: answer,
            votes: new Map()
        }

        answerModel.create(newAnswerData)
            .then(answer => {
                res.status(201).json({
                    message: `new answer for questionId ${questionId} created!`,
                    answer
                })
            })
            .catch(next)

    }

    static edit(req, res, next) {
        const { answerId } = req.params
        const { answer } = req.body

        const editAnswerData = {
            content: answer
        }

        answerModel.findByIdAndUpdate(answerId, editAnswerData, { new: true, runValidators: true })
            .then(answer => {
                res.status(200).json({
                    message: `answer for answer id ${answerId} updated!`,
                    answer
                })
            })
            .catch(next)
    }

    static voteAnswer(req, res, next) {
        const { userID } = req.user
        const { answerId } = req.params
        const { vote } = req.body

        answerModel.findById(answerId)
            .then(answer => {
                answer.votes.set(userID, vote)
                return answer.save()
            })
            .then(answer => {
                res.status(200).json({
                    message: `answer with id ${answerId} voted!`,
                    answer
                })
            })
            .catch(next)
    }
}

module.exports = AnswerController