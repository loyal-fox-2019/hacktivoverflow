'use strict'

const questionModel = require('../models/question')

class QuestionController {

    static getAll(req, res, next) {
        questionModel.find()
            .then(questions => {
                res.status(200).json({
                    message: `success`,
                    questions
                })
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        const { questionId } = req.params
        questionModel.findById(questionId)
            .then(question => {
                res.status(200).json({
                    question
                })
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { title, question, tags } = req.body
        const { userID } = req.user
        const newQuestionData = {
            owner: userID,
            title: title,
            content: question,
            tags: tags,
            votes: new Map()
        }
        questionModel.create(newQuestionData)
            .then(question => {
                res.status(201).json({
                    message: `question created!`,
                    question: {
                        id: question.id,
                        owner: question.owner,
                        title: question.title,
                        question: question.content,
                        createdAt: question.createdAt
                    }
                })
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { title, question, tags } = req.body
        const { questionId } = req.params
        const updateQuestionData = {
            title: title,
            content: question,
            tags: tags,
        }

        questionModel.findByIdAndUpdate(questionId, updateQuestionData, { new: true, runValidators: true })
            .then(question => {
                res.status(200).json({
                    message: `question with ID ${questionId} updated!`,
                    question: {
                        id: question.id,
                        title: question.title,
                        question: question.content,
                        createdAt: question.createdAt,
                        updatedAt: question.updatedAt
                    }
                })
            })
            .catch(next)
    }

    static voteQuestion(req, res, next) {
        const { userID } = req.user
        const { questionId } = req.params
        const { vote } = req.body

        questionModel.findById(questionId)
            .then(question => {
                question.votes.set(userID, vote)
                return question.save()
            })
            .then(question => {
                res.send(question)
            })
            .catch(next)
    }
}

module.exports = QuestionController