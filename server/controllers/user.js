const { User } = require('../models');
const Token = require('../helpers/token');
const Hash = require('../helpers/hash');

class UserController {
  // register
  static register(req, res, next) {
    User.create(req.body)
      .then(user => {
        const { _id: userId, role: userRole } = user;

        res.status(201).json({
          message: `User has been successfully created!`,
          token: Token.generate({ userId, userRole })
        });
      })
      .catch(err => next(err));
  }

  // sign in
  static signIn(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(403);
          throw new Error(`Email or password is invalid!`);
        } else {
          const { _id: userId, password: hash, role: userRole } = user;

          if (!Hash.verify(password, hash)) {
            res.status(403);
            throw new Error(`Email or password is invalid!`);
          } else {
            res.status(200).json({
              message: `User has found!`,
              token: Token.generate({ userId, userRole })
            });
          }
        }
      })
      .catch(err => next(err));
  }

  static getCurrUserProfile(req, res, next) {
    const { userId } = req.userData;
    User.findById(userId)
      .then(user => {
        if (!user) {
          res.status(404);
          throw new Error(`User doesn't exist!`);
        } else {
          res.status(200).json({
            message: `Fetch user profile SUCCESS!`,
            data: {
              _id: user._id,
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              role: user.role
            }
          });
        }
      })
      .catch(err => next(err));
  }

  static getOtherUserProfile(req, res, next) {
    const { userId } = req.params;
    User.findById(userId)
      .then(user => {
        if (!user) {
          res.status(404);
          throw new Error(`User doesn't exist!`);
        } else {
          res.status(200).json({
            message: `Fetch user profile SUCCESS!`,
            data: {
              _id: user._id,
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              role: user.role
            }
          });
        }
      })
      .catch(err => next(err));
  }
}

module.exports = UserController;
