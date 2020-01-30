const kue = require('kue');
const { User, Question, Answer } = require('../models');
const Token = require('../helpers/token');
const Hash = require('../helpers/hash');

const jobs = kue.createQueue();

class UserController {
  // register
  static register(req, res, next) {
    User.create(req.body)
      .then(user => {
        const { _id: userId, role: userRole } = user;

        const message = {
          from: process.env.EMAIL,
          to: user.email,
          subject: 'Welcome message!',
          text: `Welcome to the Hacktiv Overflow! I'm sure you'll find the question and answer that you care about!`,
          html: `<h1>Welcome to the Hacktiv Overflow!</h1><p>I'm sure you'll find the question and answer that you care about!</p>`
        };

        console.log(`Send email...`);
        jobs
          .create('testing', {
            title: `Send email...`,
            message
          })
          .save();

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

    let output = null;

    User.findById(userId)
      .then(user => {
        if (!user) {
          res.status(404);
          throw new Error(`User doesn't exist!`);
        } else {
          output = {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            questionList: [],
            answerList: []
          };
          return Question.find({ authorId: user._id });
        }
      })
      .then(questions => {
        questions.forEach(question => {
          output.questionList.push({
            _id: question._id,
            title: question.title
          });
        });

        return Answer.find({ authorId: output._id });
      })
      .then(answers => {
        const tempPromise = [];
        const tempQuestionId = [];

        answers.forEach(answer => {
          tempQuestionId.push(String(answer.questionId));
        });

        [...new Set(tempQuestionId)].forEach(item => {
          tempPromise.push(Question.findById(item));
        });

        return Promise.all(tempPromise);
      })
      .then(questions => {
        console.log(questions.length);
        questions.forEach(item => {
          output.answerList.push({
            _id: item._id,
            title: item.title
          });
        });

        return res.status(200).json({
          message: `Fetch user profile success!`,
          data: output
        });
      })
      .catch(err => next(err));
  }

  static getOtherUserProfile(req, res, next) {
    const { userId } = req.params;

    let output = null;

    User.findById(userId)
      .then(user => {
        if (!user) {
          res.status(404);
          throw new Error(`User doesn't exist!`);
        } else {
          console.log(user === null);
          output = {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            questionList: [],
            answerList: []
          };
          return Question.find({ authorId: user._id });
        }
      })
      .then(questions => {
        questions.forEach(question => {
          console.log(question === null);
          output.questionList.push({
            _id: question._id,
            title: question.title,
            upvote: question.upvote,
            downvote: question.downvote
          });
        });

        return Answer.find({ authorId: output._id });
      })
      .then(answers => {
        const tempPromise = [];
        const tempQuestionId = [];

        answers.forEach(answer => {
          tempQuestionId.push(String(answer.questionId));
        });

        [...new Set(tempQuestionId)].forEach(item => {
          tempPromise.push(Question.findById(item));
        });

        return Promise.all(tempPromise);
      })
      .then(questions => {
        console.log(questions);
        questions.forEach((item, index) => {
          if (item !== null) {
            output.answerList.push({
              _id: item._id,
              title: item.title,
              upvote: item.upvote,
              downvote: item.downvote
            });
          }
        });

        return res.status(200).json({
          message: `Fetch user profile success!`,
          data: output
        });
      })
      .catch(err => next(err));
  }
}

module.exports = UserController;
