"use strict"

const User = require('../models/user')
const jwt = require('../helpers/jwt')
const Question = require('../models/question')
const Answer = require('../models/answer')

function authenticate(req, res, next) {
    try {
        let data = req.headers.token
        console.log(req.headers.token)
        const userData = jwt.checkToken(data)
        User.findById(userData.userId)
            .then(user => {
                if (!user) {
                    throw new Error('user not valid')
                } else {
                    req.userId = userData.userId
                    next()
                }
            })
    }
    catch (err) {
        next(err)
    }
}

function questionAuthorize(req, res, next) {
    try {
        Question.findById(req.params.id)
            .then((data) => {
                if (data.userId != req.userId) {
                    throw new Error('you not authorize')
                } else {
                    next()
                }
            })
    }
    catch (err) {
        next(err)
    }
}

function answerAuthorize(req, res, next) {
    try {
        Answer.findById(req.params.id)
            .then((data) => {
                if (data.userId != req.userId) {
                    throw new Error('you not authorize')
                } else {
                    next()
                }
            })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    authenticate,
    questionAuthorize,
    answerAuthorize
}