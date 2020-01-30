const User = require('../models/user')
const generateToken = require('../helpers/generateToken')
class ControllerUser {
  static register(req, res, next) {
    const hash = require('../helpers/hash')
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: hash(req.body.password),
      platform: 'normal'
    }
    User.create(userData)
      .then((user) => {
        const payload = {
          id: user._id,
          username: user.username,
          email: user.email,
          platform: user.platform
        }
        const token = generateToken(payload)
        res.status(201).json({
          token: token,
          id: user._id,
          username: user.username,
          platform: user.platform
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static login(req, res, next) {
    let userData
    User.findOne({
      $and: [
        {
          email: req.body.email
        },
        {
          platform: 'normal'
        }
      ]
    })
      .then((user) => {
        if (!user) {
          let err = {
            name: 'Auth Error'
          }
          next(err)
        } else {
          userData = user
          const compare = require('../helpers/compare')
          return compare(req.body.password, user.password)
        }
      })
      .then((result) => {
        if (!result) {
          let err = {
            name: 'Auth Error'
          }
          next(err)
        } else {
          const payload = {
            id: userData._id,
            username: userData.username,
            email: userData.email
          }
          const token = generateToken(payload)
          res.status(201).json({
            token: token,
            id: userData._id,
            username: userData.username,
            platform: userData.platform
          })
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static gSignIn(req, res, next) {
    const { OAuth2Client } = require('google-auth-library')
    const client = new OAuth2Client(process.env.G_CLIENT_ID)
    let payload
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.G_CLIENT_ID
      })
      .then((ticket) => {
        payload = ticket.getPayload()
        return User.findOne({
          email: payload.email,
          platform: 'google'
        })
      })
      .then((user) => {
        if (user) {
          return user
        } else {
          const randomizedUser = require('../helpers/randomizedUser')
          let newUsername = randomizedUser(payload.name)
          let newUser = {
            username: newUsername,
            email: payload.email,
            platform: 'google',
            password: process.env.G_SIGN_DEF_PASSWORD
          }
          console.log(newUser)
          return User.create(newUser)
        }
      })
      .then((newUser) => {
        console.log(newUser)
        const token = generateToken({
          id: newUser._id,
          username: newUser.username,
          email: newUser.email
        })
        res.status(201).json({
          token: token,
          id: newUser._id,
          platform: newUser.platform,
          username: newUser.username
        })
      })
      .catch((err) => {
        // console.log(err);
        next(err)
      })
  }
}
module.exports = ControllerUser
