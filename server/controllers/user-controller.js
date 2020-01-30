const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
  static login(req, res, next) {
    User.findOne({ email: req.body.email, platform: 'normal' })
      .then(user => {
        if (!user) {
          throw { name: 'BadRequest', message: 'Email or password is wrong' }
        }

        if (!bcryptjs.compareSync(req.body.password, user.password)) {
          throw { name: 'BadRequest', message: 'Email or password is wrong' }
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({ token, email: user.email, username: user.username })
      })
      .catch(next)
  }

  static register(req, res, next) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      platform: req.body.platform,
    })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res
          .status(201)
          .json({ token, email: user.email, username: user.username })
      })
      .catch(next)
  }
}

module.exports = UserController
