const User = require('../models/user')
const randomPassword = require('../helpers/random-password')

// google section
const { OAuth2Client } = require('google-auth-library')
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// dependency
const jwt = require('jsonwebtoken')

class ThirdAPIController {
  static google(req, res, next) {
    let payload = null

    if (!req.body.token) {
      return next({ name: 'BadRequest', message: 'Google token is required' })
    }

    googleClient
      .verifyIdToken({
        idToken: req.body.token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then(ticket => {
        payload = ticket.getPayload()
        return User.findOne({ email: payload.email, platform: 'google' })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            email: payload.email,
            password: randomPassword(),
            platform: 'google',
          })
        }
      })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({ token, email: user.email })
      })
      .catch(next)
  }

  static github(req, res, next) {
    res.json({ message: 'welcome to github login router' })
  }

  static twitter(req, res, next) {
    res.json({ message: 'welcome to twitter login route' })
  }
}

module.exports = ThirdAPIController
