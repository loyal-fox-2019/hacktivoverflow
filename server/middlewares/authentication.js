'use strict'

const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
  let token = req.headers.token
  try {
    const decoded = verifyToken(token)
    User
      .findById(decoded.id)
      .then(user => {
        if (user) {
          req.decoded = user
          next()
        } else {
          throw new ({ status: 400, message: 'tidak masuk' })
        }
      })
      .catch(err => { next(err) })
  } catch (err) {
    next(err)
  }
}