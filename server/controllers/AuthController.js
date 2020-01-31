const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../helpers/bcrypt')

class AuthController{
  static register(req, res, next){
    const form = req.body
    User
      .create({
        fullname: form.fullname,
        email: form.email,
        password: form.password,
      })
      .then(user => {
        console.log(user)
        const token = jwt.sign({
          userId: user.id,
          emai: user.email
        }, 'secretfox')

        res.status(200).json({
          id: user.id,
          email: user.email,
          token
        })
      })
      .catch(next)
  }

  static login(req, res, next){
    const form = req.body
    User
      .findOne({
        email: form.email
      })
      .then(user => {
        const msg = {
          name: 'AuthError',
          message: 'email/password incorrect'
        }
        if (user) {
          const isPassword =  checkPassword(form.password, user.password)
          if (isPassword) {
            const token = jwt.sign({
              userId: user.id,
              emai: user.email,
            }, 'secretfox')

            res.status(200).json({
              id: user.id,
              email: user.email,
              token
            })    
          }else{
            throw msg  
          }
        }else{
          throw msg
        }
      })
      .catch(next)
  }
}
module.exports = AuthController