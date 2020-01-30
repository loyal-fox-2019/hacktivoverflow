const jwt = require('../helpers/jwt')
const User = require('../models/user')
const Content = require('../models/content')
const mongoose = require('mongoose')
module.exports = {
  authentication: function(req, res, next) {
    try {
      const user = jwt.verifyToken(req.headers.token, process.env.JWT_KEY)
      User.findOne({ email: user.email }).then(result => {
        if (result) {
          req.body.user = result
          req.params.user = result
          next()
        } else {
          throw new Error('User not found')
        }
      })
    } catch (error) {
      console.log('langsung dia masuk sini')

      next(error)
    }
  },

  authorization: function(req, res, next) {
    let loginUser = req.body.user
    console.log(loginUser)

    Content.findById(req.params.id)
      .then(result => {
        console.log('ini di dalam')
        console.log(result.user)
        console.log(loginUser._id)
        if (String(loginUser._id) === String(result.user)) {
          console.log('dia ga eror kok')

          next()
        } else {
          console.log('dia masuk kesini errornya 1221')

          next(new Error('Not Authorized'))
        }
      })
      .catch(err => {
        console.log('dia masuk kesinsi errornya')

        next(new Error('Not Authorized'))
        console.log(err)
      })
  }
}
