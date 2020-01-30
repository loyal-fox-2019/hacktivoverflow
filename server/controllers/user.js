const User = require('../models/User')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/token')

class UserController{
  static login(req, res, next){
    let { user, password } = req.body
    User
    .findOne({
      $or: [{username: user}, {email: user}]
    })
    .then((user) => {
      if (user && compare(password, user.password)){
        let payload = {_id: user._id}
        let token = sign(payload)
        res.status(200).json({token, username: user.username})
      }
      else {
        throw {errorCode: 400, errorMessage: 'Wrong credentials'}
      }
    })
    .catch(next)
  }

  static register(req, res, next){
    let { username, email, password } = req.body
    let credentials = {username, email, password}
    User
    .create(credentials)
    .then((user) => {
      let payload = {_id: user._id}
      let token = sign(payload)
      res.status(200).json({token, username: user.username})
    })
    .catch(next)
  }

  static modifyTags(req, res, next){
    let { tags } = req.body
    let newTags = {tags}
    let options = {
      new: true, omitUndefined: true
    }
    User
    .findByIdAndUpdate(req.userData.id, newTags, options)
    .select('tags')
    .then(({tags}) => {
      res.status(200).json(tags)
    })
    .catch(next)
  }

  static getTags(req, res, next){
    User
    .findById(req.userData.id)
    .select('tags')
    .then(({tags}) => {
      res.status(200).json(tags)
    })
    .catch(next)
  }
}

module.exports = UserController