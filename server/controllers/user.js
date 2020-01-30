const User = require('../models/user'),
  { compare } = require('../helpers/bcrypt'),
  { OAuth2Client } = require("google-auth-library"),
  { generateToken } = require('../helpers/jwt')

class UserController {
  static addTags(req, res, next) {
    let { tags } = req.body
    User.updateOne({_id: req.user.id}, { $addToSet: { tags }})
      .then(updated => {
        res.send(updated)
      })
      .catch(next)
  }
  static removeTag(req, res, next) {
    let { tag } = req.body
    User.updateOne({_id: req.user.id}, { $pull: { tags: tag }})
      .then(updated => {
        res.send(updated)
      })
      .catch(next)
  }
  static googleLogin(req, res, next) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    let googlePayload = null;
    const client = new OAuth2Client(clientId);
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: clientId
      })
      .then(ticket => {
        googlePayload = ticket.getPayload();
        return User.findOne({ email: googlePayload.email });
      })
      .then(user => {
        if (user) {
          return user;
        } else {
          return User.create({
            email: googlePayload.email,
            username: googlePayload.name,
            profile_pic: googlePayload.picture,
            password: process.env.DEFAULT_PASSWORD
          });
        }
      })
      .then(user => {
        res.status(200).json({ token: generateToken({ _id: user._id }), username: user.username });
      })
      .catch(next);
  }
  static all (req, res, next) {
    User.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next)
  }
  static username (req, res, next) {
    // let username = req.body.username
    User.findById(req.user.id)
      .select('-password')
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }
  static login (req, res, next) {
    const { email, password } = req.body
    User.findOne({email})
      .then(user => {
        if(!user){
          next({status: 400, message: 'invalid email or password'})
        } else if(!compare(password, user.password)){
          next({status: 400, message: 'invalid password or email'})
        } else {
          res.status(200).json({token: generateToken({_id: user._id}), username: user.username})
        }
      })
      .catch(next)
  }
  static register (req, res, next) {
    const { username, email, password, profile_pic } = req.body
    User.create({
      username,
      email,
      password,
      profile_pic
    })
      .then(user => {
        res.status(201).json({ token: generateToken({ _id: user._id }), username: user.username})
        // res.status(201).json(user)
      })
      .catch(next)
  }
}

module.exports = UserController
