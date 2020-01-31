const User = require('../models/user')
const randomPassword = require('../helpers/random-password')

// google section
const { OAuth2Client } = require('google-auth-library')
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// dependency
const axios = require('axios')
const jwt = require('jsonwebtoken')
const request = require('request')
const qs = require('querystring')

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
            username: payload.name,
            email: payload.email,
            password: randomPassword(),
            platform: 'google',
            avatar: payload.picture,
          })
        }
      })
      .then(user => {
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

  static github(req, res, next) {
    if (!req.body.code) {
      return next({ name: 'BadRequest', message: 'Code is required' })
    }

    let access_token = null
    let user_email = null
    let user_login = null
    let avatar_url = null

    axios
      .post(
        `https://github.com/login/oauth/access_token`,
        {},
        {
          params: {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.body.code,
          },
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(({ data }) => {
        access_token = data.access_token
        return axios.get('https://api.github.com/user/emails', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${access_token}`,
          },
        })
      })
      .then(({ data }) => {
        user_email = data[0].email
        return axios.get('https://api.github.com/user', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${access_token}`,
          },
        })
      })
      .then(({ data }) => {
        user_login = data.login
        avatar_url = data.avatar_url
        return User.findOne({ email: user_email, platform: 'github' })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            username: user_login,
            email: user_email,
            password: randomPassword(),
            platform: 'github',
            avatar: avatar_url,
          })
        }
      })
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({
          token,
          username: user.username,
          username: user.username,
          avatar: user.avatar,
          tags: user.tags,
          id: user.id,
        })
      })
      .catch(next)
  }

  static requestTwitterToken(req, res, next) {
    const url = 'https://api.twitter.com/oauth/request_token'
    const oauth = {
      callback: 'http://stuck-overflow.didadadida93.xyz/callback-twitter',
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      token: process.env.TWITTER_TOKEN,
      token_secret: process.env.TWITTER_TOKEN_SECRET,
    }

    request.post({ url, oauth }, function(e, r, body) {
      if (e) res.status(500).json(e)

      const res_data = qs.parse(body)

      res.json({
        url: `https://api.twitter.com/oauth/authorize?oauth_token=${res_data.oauth_token}`,
      })
    })
  }

  static twitter(req, res, next) {
    const { oauth_token, oauth_verifier } = req.body

    request.post(
      {
        url: 'https://api.twitter.com/oauth/access_token',
        qs: {
          oauth_consumer_key: process.env.TWITTER_CONSUMER_KEY,
          oauth_token,
          oauth_verifier,
        },
      },
      function(e, r, body) {
        let res1 = qs.parse(body)
        let oauth1 = res1.oauth_token
        let oauth1_secret = res1.oauth_token_secret
        let user_id = res1.user_id
        let screen_name = res1.screen_name

        request.get(
          {
            url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
            oauth: {
              consumer_key: process.env.TWITTER_CONSUMER_KEY,
              consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
              token: oauth1,
              token_secret: oauth1_secret,
            },
            qs: {
              include_email: true,
            },
            json: true,
          },
          function(e, r, body) {
            if (e) res.status(500).json(e)

            User.findOne({ email: body.email, platform: 'twitter' })
              .then(user => {
                if (user) {
                  const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                  )
                  res.json({
                    token,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar,
                    tags: user.tags,
                    id: user.id,
                  })
                } else {
                  User.create({
                    username: body.screen_name,
                    email: body.email,
                    password: randomPassword(),
                    platform: 'twitter',
                    avatar: body.profile_image_url_https,
                  })
                    .then(user => {
                      const token = jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                      )
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
              })
              .catch(next)
          },
        )
      },
    )
  }
}

module.exports = ThirdAPIController
