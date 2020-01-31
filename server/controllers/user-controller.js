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
        res.json({
          token,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          tags: user.tags,
          id: user.id,
        })
      })
      .catch(next)
  }

  static register(req, res, next) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      platform: req.body.platform,
      avatar: 'https://placekitten.com/200/200',
    })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.status(201).json({
          token,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          tags: user.tags,
          id: user.id,
        })
      })
      .catch(next)
  }

  static getUserDetail(req, res, next) {
    User.findOne({ _id: req.payload.id })
      .then(user => {
        console.log(user.id)
        res.json({
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          tags: user.tags,
          id: user.id,
        })
      })
      .catch(next)
  }

  static addTag(req, res, next) {
    User.findOne({ _id: req.payload.id })
      .then(user => {
        if (!user.tags.includes(req.body.tag)) {
          user.tags.push(req.body.tag)
        }
        return user.save({ validateBeforeSave: false })
      })
      .then(() => {
        res.json({ message: 'Tag added' })
      })
      .catch(next)
  }
}

module.exports = UserController
