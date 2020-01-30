'use strict'

const { Question } = require('../models')

module.exports = (req, res, next) => {
  Question
    .findById({ _id: req.params.id })
    .then(question => {
      if (String(question.userId) == String(req.decoded._id)) {
        next()
      } else {
        next({ status: 403, message: `You dont have authorize to do that` })
      }
    })
    .catch(err => { next(err) })
}