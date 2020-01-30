const modelUser = require('../models/modelUser.js')
const modelQuestion = require("../models/modelQuestions.js")
const modelAnswer = require("../models/modelAnswer.js")

function toEditAndDeleteQuestion(req, res, next) {
    modelUser.findById(req.payload.id)
        .then(userFoundToAuthorizeEdit => {

            if (userFoundToAuthorizeEdit) {
                return modelQuestion.findById(req.params.id).populate(['userId'])
            } else {
                res.status(400).json({ message: "you are not allowed" })
            }
        })
        .then(questionFoundInAuthorize => {
            if (questionFoundInAuthorize.userId._id == req.payload.id) {
                next()
            } else {
                res.status(403).json({ message: "you are not allowed to do this action" })
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "Internal Server Error" })
        })
}
function toEditAnswer(req, res, next) {

    modelUser.findById(req.payload.id)
        .then(userFoundToAuthorizeEdit => {
            // console.log(userFoundToAuthorizeEdit, "masuk findById")
            if (userFoundToAuthorizeEdit) {
                return modelAnswer.findById(req.params.answerId).populate(['userId'])
            } else {
                res.status(400).json({ message: "you are not allowed" })
            }
        })
        .then(questionFoundInAuthorize => {
            // console.log(questionFoundInAuthorize, "masuk find question")
            if (questionFoundInAuthorize.userId._id == req.payload.id) {
                next()
            } else {
                res.status(403).json({ message: "you are not allowed to do this action" })
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "Internal Server Error" })
        })
}
module.exports = { toEditAndDeleteQuestion, toEditAnswer }