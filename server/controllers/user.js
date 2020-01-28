const Model = require("../models/user");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class User {
  static register(req, res, next) {
    Model.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(created => {
        let token = generateToken({
          id: created._id,
          username: created.username
        });
        res.status(201).json({ token: token });
      })
      .catch(next);
  }
  static login(req, res, next) {
    let err = {
      name: "Login Validation",
      message: "Wrong Email or Password"
    };
    Model.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          let passwordMatch = comparePassword(req.body.password, user.password);
          if (passwordMatch) {
            let token = generateToken({
              id: user._id,
              username: user.username
            });
            res.status(200).json({ token: token });
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      })
      .catch(next);
  }
}

module.exports = User;
