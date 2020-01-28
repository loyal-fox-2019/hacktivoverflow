const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { comparePassword } = require('../helper/hashPassword')

class UserController {
  static register(req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User.create(data)
      .then(result => {
        const token = jwt.sign(
          {
            id: result._id,
            name: result.name,
            email: result.email
          },
          process.env.JWT_SECRET
        )
        res.status(201).json({
          message: 'User created',
          result: result,
          token: token
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static login(req, res, next) {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({ email: data.email }).then(result => {
      if (!result) {
        res.status(404).json({
          message: 'User not found, Please register your account first'
        })
      } else {
        const compare = comparePassword(data.password, result.password)
        if (!compare) {
          res.status(400).json({
            message: 'Wrong email/password!'
          })
        } else {
          const token = {
            id: result._id,
            name: result.name,
            email: result.email
          }
          res.status(200).json({
            message: 'Login success',
            token: token
          })
        }
      }
    })
  }
}

module.exports = UserController
