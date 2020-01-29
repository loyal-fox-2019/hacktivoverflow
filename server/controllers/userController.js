const User = require('../models/user'),
      { validatePass } = require('../helpers/bcrypt'),
      { generateToken } = require('../helpers/jwt'),
      { OAuth2Client } = require('google-auth-library'),
      userErr = { status: 404, resource: 'User'},
      loginErr = { status: 400, message: 'Incorrect email/password'}

module.exports = class UserController {
  
  static register(req, res, next) {
    console.log(req.body)
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then(user => {
        let payload = {
          id: user._id
        }
        let token = generateToken(payload)
        res.status(201).json({ _id: user._id, name: user.name, email: user.email, image: user.image, isAdmin: user.isAdmin, access_token: token })
      })
      .catch(next)
  }

  static login(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          next(loginErr);
        } else if (validatePass(req.body.password, user.password)) {
          let payload = {
            id : user._id
          };
          let token = generateToken(payload);
          res.status(200).json({ _id: user._id, name: user.name, email: user.email, image: user.image, isAdmin: user.isAdmin, access_token: token })
        } else {
          next(loginErr);
        }
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    let personalInfo;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        personalInfo = ticket.getPayload()
        return User.findOne({ email: personalInfo.email })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            name: personalInfo.name,
            email: personalInfo.email,
            password: process.env.DEFAULT_PASSWORD,
            image: personalInfo.picture
          })
        }
      })
      .then(user => {
        let payload = {
          id: user._id,
          email: user.email
        }
        let token = generateToken(payload)
        res.status(200).json({access_token: token, name: user.name, id: user._id, image: user.image})
      })
      .catch(next)
  }

  static edit(req, res, next) {
    const { name } = req.body;
    User.findByIdAndUpdate(
      req.decoded.id,
      { name, image: req.file.cloudStoragePublicUrl },
      { new: true, runValidators: true, omitUndefined: true }
    )
      .then(user => {
        let newUser = user.toObject()
        delete newUser.password
        res.status(200).json(newUser)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    User.findById(req.decoded.id).select('-password')
      .then(data => {
        if (!data) {
          next(userErr)
        }
        res.status(200).json(newUser)
      })
      .catch(next)
  }

  static watchTag(req, res, next) {
    // { tag: apa apa }
    let duplicate = 0;
    User.findById(req.decoded.id)
      .then(user => {
        user.tags.forEach(tag => {
          if (String(req.body.tag) === String(tag)) {
            duplicate++;
          }
        })
        if (duplicate) {
          return User.findByIdAndUpdate(
            req.decoded.id,
            { $pull: { tags : req.body.tag } },
            { new: true, validateBeforeSave: false }
          )
        } else {
          return User.findByIdAndUpdate(
            req.decoded.id,
            { $addToSet: { tags : req.body.tag } },
            { new: true, validateBeforeSave: false }
          )
        }
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }

}
