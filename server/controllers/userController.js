const User = require('../models/User');
const { comparePassword } = require('../helpers/bcrypt');

class userController {
  // register
  static register(req, res, next) {
    const userForm = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(userForm)
      .then((createdUser) => {
        res.status(201);
        res.json(createdUser);
      })
      .catch((err) => {
        next(err);
      });
  }
  // login
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      email
    })
      .then((foundUser) => {
        if (!foundUser) {
          throw new Error("Email or Password is invalid");
        }
        else {
          const isValid = comparePassword(password, foundUser.password);
          if (!isValid) {
            throw new Error("Email or Password is invalid");
          }
          else {
            res.status(201);
            res.json(foundUser);
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = userController;