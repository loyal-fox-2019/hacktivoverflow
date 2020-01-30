const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')
const { verifyToken } = require('../helpers/jwt')

function authentication(req, res, next) {
    try {
        console.log(req.headers.token, 'ini header');
        req.decoded = verifyToken(req.headers.token)

        User.findById(req.decoded.id)
            .then((user) => {
                if (!user) throw ({ status: 403, msg: 'Invalid Token' })
                else next()
            }).catch(next);
    } catch (error) {
        next(error)
    }
}

function questionAuthorization(req, res, next) {
    Question.findById(req.params.id)
        .then((question) => {
            if (!question) throw ({ status: 404, msg: `Question not found` })
            else if (question.author != req.decoded.id) throw ({ status: 403, msg: 'Forbidden' })
            else next()
        }).catch(next);
}

function answerAuthorization(req, res, next) {
    Answer.findById(req.params.id)
        .then((answer) => {
            if (!answer) throw ({ status: 404, msg: `Answer not found` })
            else if (answer.author != req.decoded.id) throw ({ status: 403, msg: 'Forbidden' })
            else next()
        }).catch(next);
}

module.exports = {
    authentication,
    questionAuthorization,
    answerAuthorization
}