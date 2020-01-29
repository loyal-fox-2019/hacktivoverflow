const { Question, Answer } = require('../models');

class QuestionController {
  static create(req, res, next) {
    const { userId: authorId } = req.userData;
    const { title, description } = req.body;
    Question.create({ title, description, authorId })
      .then(question => {
        res.status(201).json({
          message: `Question has been successfully created!`
        });
      })
      .catch(err => next(err));
  }

  static readAll(req, res, next) {
    const output = [];

    Question.find({})
      .populate('authorId')
      .then(questions => {
        if (questions.length === 0) {
          res.status(404);
          throw new Error(`Question collection is empty!`);
        } else {
          const tempPromise = [];
          questions.forEach(question => {
            output.push({
              _id: question._id,
              title: question.title,
              upvote: question.upvote,
              downvote: question.downvote,
              description: question.description,
              author: {
                _id: question.authorId._id,
                username: question.authorId.username,
                avatar: question.authorId.avatar
              },
              totalAnswer: null
            });

            tempPromise.push(Answer.find({ questionId: question._id }));
          });

          return Promise.all(tempPromise);
        }
      })
      .then(answersPerQuestions => {
        if (answersPerQuestions) {
          answersPerQuestions.forEach((answers, index) => {
            output[index].totalAnswer = answers.length;
          });
        }

        res.status(200).json({
          message: `All questions are successfully retrieved!`,
          data: output
        });
      })
      .catch(err => next(err));
  }

  static readOne(req, res, next) {
    let output = null;

    Question.findById(req.params.questionId)
      .populate('authorId')
      .then(question => {
        if (!question) {
          res.status(404);
          throw new Error(`Question is not found!`);
        } else {
          output = {
            _id: question._id,
            title: question.title,
            description: question.description,
            upvote: question.upvote,
            downvote: question.downvote,
            author: {
              _id: question.authorId._id,
              username: question.authorId.username,
              avatar: question.authorId.avatar
            },
            answerList: []
          };

          return Answer.find({ questionId: question._id }).populate('authorId');
        }
      })
      .then(answers => {
        answers.forEach(answer => {
          output.answerList.push({
            _id: answer._id,
            content: answer.content,
            upvote: answer.upvote,
            downvote: answer.downvote,
            author: {
              _id: answer.authorId._id,
              username: answer.authorId.username,
              avatar: answer.authorId.avatar
            }
          });
        });

        res.status(200).json({
          message: `Question is successfully retrieved!`,
          data: output
        });
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    const { userId: authorId } = req.userData;
    const { questionId: _id } = req.params;

    Question.findOneAndUpdate({ authorId, _id }, req.body)
      .then(question => {
        if (!question) {
          res.status(404);
          throw new Error(`Question is not found!`);
        } else {
          res.status(200).json({
            message: `Question is successfully updated!`
          });
        }
      })
      .catch(err => next(err));
  }

  static userUpvote(req, res, next) {
    const { userId } = req.userData;
    const { questionId } = req.params;

    Question.findById(questionId)
      .then(question => {
        let flagUser = false;
        question.upvote.forEach(user => {
          if (String(user) === userId) {
            question.upvote.pull(userId);
            flagUser = true;
            // throw new Error(`This user already upvote!`);
          }
        });

        question.downvote.forEach(user => {
          if (String(user) === userId) {
            question.downvote.pull(userId);
            // throw new Error(`This user already downvote!`);
          }
        });

        if (!flagUser) {
          question.upvote.push(userId);
        }

        return question.save();
      })
      .then(() =>
        res.status(200).json({
          message: `User successfully upvote the question!`
        })
      )
      .catch(err => next(err));
  }

  static userDownvote(req, res, next) {
    const { userId } = req.userData;
    const { questionId } = req.params;

    Question.findById(questionId)
      .then(question => {
        let flagUser = false;
        question.upvote.forEach(user => {
          if (String(user) === userId) {
            question.upvote.pull(userId);
            // throw new Error(`This user already upvote!`);
          }
        });

        question.downvote.forEach(user => {
          if (String(user) === userId) {
            question.downvote.pull(userId);
            flagUser = true;
            // throw new Error(`This user already downvote!`);
          }
        });

        if (!flagUser) {
          question.downvote.push(userId);
        }

        return question.save();
      })
      .then(() =>
        res.status(200).json({
          message: `User successfully downvote the question!`
        })
      )
      .catch(err => next(err));
  }

  static userUnvote(req, res, next) {
    const { userId } = req.userData;
    const { questionId } = req.params;

    Question.findById(questionId)
      .then(question => {
        question.upvote = question.upvote.filter(user => {
          return String(user) !== userId;
        });

        question.downvote = question.downvote.filter(user => {
          return String(user) !== userId;
        });

        return question.save();
      })
      .then(() =>
        res.status(200).json({
          message: `User successfully unvote the question!`
        })
      )
      .catch(err => next(err));
  }

  static delete(req, res, next) {
    const { userId: authorId } = req.userData;
    const { questionId: _id } = req.params;
    Question.findOneAndDelete({ authorId, _id })
      .then(question => {
        if (!question) {
          res.status(404);
          throw new Error(`Question is not found!`);
        } else {
          res.status(200).json({
            message: `Question is successfully removed!`
          });
        }
      })
      .catch(err => next(err));
  }
}

module.exports = QuestionController;
