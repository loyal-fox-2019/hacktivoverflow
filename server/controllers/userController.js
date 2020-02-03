const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { comparePassword } = require('../helper/hashPassword')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

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
          id: result._id,
          token: token
        })
      })
      .catch(err => {
        console.log(err)
        err.code = 500
        err.message = 'Internal Server Error'
        res.status(500).json(err)
      })
  }

  static login(req, res, next) {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({ email: data.email })
      .then(result => {
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
            const token = jwt.sign(
              {
                id: result._id,
                name: result.name,
                email: result.email
              },
              process.env.JWT_SECRET
            )
            res.status(200).json({
              message: 'Login success',
              id: result._id,
              token: token
            })
          }
        }
      })
      .catch(err => {
        err.code = 404
        err.message = 'User not found! Please check your email/password'
        res.status(404).json(err)
      })
  }

  static gSign(req, res, next) {
    let payload = null
    let regData = null
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        regData = {
          name: payload.name,
          email: payload.email,
          password: process.env.DEFAULT_PASS
        }
        return User.findOne({ email: regData.email })
      })
      .then(data => {
        if (data === null) {
          return User.create(regData)
        } else {
          let token = jwt.sign(
            {
              id: data._id,
              name: data.name,
              email: data.email
            },
            process.env.JWT_SECRET
          )
          res.status(200).json({
            message: 'Login Success',
            token: token,
            id: data._id
          })
        }
      })
      .then(data => {
        let token = jwt.sign(
          {
            id: data._id,
            name: data.name,
            email: data.email
          },
          process.env.JWT_SECRET
        )
        res.status(201).json({
          message: 'Login Success',
          token: token,
          id: data._id
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }
}

module.exports = UserController
