const { verify } = require('../helpers/token')
const User = require('../models/User')

function authenticate(req, res, next){
  try{
    if (req.headers.hasOwnProperty('token')){
      let payload = verify(req.headers.token)
      User
      .findById(payload._id)
      .then((user) => {
        if (user){
          req.userData = user
          next()
        }
        else {
          throw {errorCode: 400, errorMessage: 'Invalid token'}
        }
      })
      .catch(next)
    }
    else {
      throw {errorCode: 400, errorMessage: 'Invalid token'}
    }
  }
  catch(err){
    next(err)
  }
}

module.exports = authenticate