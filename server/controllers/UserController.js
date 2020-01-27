'use strict';
const { User } = require('../models');
const { sign } = require('../helpers/jwt');
const { compare } = require('../helpers/bcryptjs');

class UserController {

  static async registerUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const doc = {
        username,
        password,
      };
      const response = await User.create(doc)
      const { _id } = response;
      const payload = {
        username,
        id: _id
      };
      const token = sign(payload);
      res.status(201).json({ token, username });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const check = await User.findOne({ username });
      if (!check) {
        next({ auth: true, status: 400, message: 'Username or password is wrong' });
      } else {
        if (compare(password, check.password)) {
          const { _id } = check;
          const payload = {
            username,
            id: _id
          };
          const token = sign(payload);
          res.status(200).json({ token, username });
        } else {
          next({ auth: true, status: 400, message: 'Username or password is wrong' });
        }
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
