'use strict'
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const bcrypt = require('bcryptjs')

class userController {
  static login(req, res, next) {
    const { email, password } = req.body
    User
      .findOne({email})
      .then(user => {
        if (user) {
          let valid = bcrypt.compareSync(password, user.password)
          if (valid) {
            let token = generateToken({ id: user.id })
            let data = {
              id: user._id,
              username: user.username,
              email: user.email,
              token
            }
            res.status(200).json(data)
          } else {
            throw ({
              status: 400,
              message: 'Your password is wrong'
            })
          }
        } else {
          throw ({
            status: 400,
            message: 'Your email is not registered'
          })
        }
      })
      .catch(next)
  }

  static register(req, res, next) {
    const { email, password, username } = req.body
    User
      .create({ email, password, username })
      .then(user => {
        let token = generateToken({ id: user.id })
        let data = {
          id: user._id,
          username: user.username,
          email: user.email,
          token
        }
        res.status(201).json(data)
      })
      .catch(next)
  }
}

module.exports = userController