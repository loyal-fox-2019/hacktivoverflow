'use strict'

const questionModel = require('../models/question')
const answerModel = require('../models/answer')

const ownQuestion = (req, res, next) => {
    const { userID } = req.user
    const { questionId } = req.params

    questionModel.findOne({
        $and: [
            { _id: questionId },
            { owner: userID }
        ]
    })
        .then(question => {
            if (!question) {
                const customError = new Error(`unauthorize to do this action!`)
                customError.status = 403
                throw customError
            }
            else {
                next()
            }
        })
        .catch(next)
}

const ownAnswer = (req, res, next) => {
    const { userID } = req.user
    const { answerId } = req.params

    answerModel.findOne({
        $and: [
            { _id: answerId },
            { owner: userID }
        ]
    })
        .then(question => {
            if (!question) {
                const customError = new Error(`unauthorize to do this action!`)
                customError.status = 403
                throw customError
            }
            else {
                next()
            }
        })
        .catch(next)
}

module.exports = {
    ownQuestion,
    ownAnswer
}