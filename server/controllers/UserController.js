'use strict';
const { User, Question } = require('../models');
const { sign } = require('../helpers/jwt');
const { compare } = require('../helpers/bcryptjs');
const kue = require('kue');
const queue = kue.createQueue();
const mailer = require('../helpers/mailer');

class UserController {

  static async getMyQuestions(req, res, next) {
    try {
      const { id } = req.token;
      const question = await Question.find({ userId: id });
      res.status(200).json(question);
    } catch (err) {
      next(err);
    }  
  }

  static async getTags(req, res, next) {
    try {
      const { id } = req.token;
      const response = await User.findOne({ _id: id }).select('watchedTags');
      res.status(200).json(response.watchedTags);
    } catch (err) {
      next(err);
    }
  }
  static async addTags(req, res, next) {
    try {
      const { tags } = req.body;
      const { id } = req.token;
      await User.updateOne({ _id: id }, { watchedTags: tags });
      res.status(200).json({ message: 'Updated!' });
    } catch (err) {
      next(err);
    }
  }

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
      queue.create('New user', {
        title: 'Send email to slimypiigyy@gmail.com',
      })
      .save();
      queue.process('New user', (job, done) => {
        mailer();
        console.log(job.data);
      });
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
          const { _id, tags } = check;
          const payload = {
            username,
            id: _id,
          };
          const token = sign(payload);
          res.status(200).json({ token, username, tags });
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
