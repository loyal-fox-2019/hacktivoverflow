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
  static editTags(req, res, next) {
    let id = req.decoded.id
    const { tags } = req.body
    let value = {
      tags
    }
    User
      .findByIdAndUpdate(id, value, { new: true, omitUndefined: true })
      .then((user) => {
        res.status(200).json(user)
      })
      .catch(next)
  }

  static fetchTags(req, res, next) {
    let id = req.decoded.id
    User
      .findById(id)
      .then(data => {
        res.status(200).json(data.tags)
      })
  }
}

module.exports = userController