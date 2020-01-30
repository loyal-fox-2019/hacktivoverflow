const { Answer, Question } = require('../models');

class AnswerController {
  static create(req, res, next) {
    const { userId: authorId } = req.userData;
    const { content, questionId } = req.body;
    Answer.create({ content, questionId, authorId })
      .then(answer => {
        res.status(201).json({
          message: `Answer has been successfully created!`
        });
      })
      .catch(err => next(err));
  }

  static readAll(req, res, next) {
    const output = [];

    Answer.find({})
      .populate('authorId')
      .then(answers => {
        if (answers.length === 0) {
          res.status(404);
          throw new Error(`Answer collection is empty!`);
        } else {
          const tempPromise = [];
          answers.forEach(answer => {
            output.push({
              _id: answer._id,
              upvote: answer.upvote,
              downvote: answer.downvote,
              content: answer.content,
              author: {
                _id: answer.authorId._id,
                username: answer.authorId.username,
                avatar: answer.authorId.avatar
              }
            });

            tempPromise.push(
              Question.findById(answer.questionId).populate('authorId')
            );
          });

          return Promise.all(tempPromise);
        }
      })
      .then(questionPerAnswers => {
        if (questionPerAnswers) {
          questionPerAnswers.forEach((question, index) => {
            output[index].question = {
              _id: question._id,
              title: question.title,
              upvote: question.upvote,
              downvote: question.downvote,
              description: question.description,
              author: {
                _id: question.authorId._id,
                username: question.authorId.username,
                avatar: question.authorId.avatar
              }
            };
          });
        }

        res.status(200).json({
          message: `All answers are successfully retrieved!`,
          data: output
        });
      })
      .catch(err => next(err));
  }

  static readOne(req, res, next) {
    let output = null;

    Answer.findById(req.params.answerId)
      .then(answer => {
        if (!answer) {
          res.status(404);
          throw new Error(`Answer is not found!`);
        } else {
          output = {
            _id: answer._id,
            upvote: answer.upvote,
            downvote: answer.downvote,
            content: answer.content,
            author: {
              _id: answer.authorId._id,
              username: answer.authorId.username,
              avatar: answer.authorId.avatar
            }
          };

          return Question.findById(answer.questionId).populate('authorId');
        }
      })
      .then(question => {
        output.question = {
          _id: question._id,
          title: question.title,
          upvote: question.upvote,
          downvote: question.downvote,
          description: question.description,
          author: {
            _id: question.authorId._id,
            username: question.authorId.username,
            avatar: question.authorId.avatar
          }
        };
        res.status(200).json({
          message: `Answer is successfully retrieved!`,
          data: output
        });
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    const { userId: authorId } = req.userData;
    const { answerId: _id } = req.params;
    Answer.findOneAndUpdate({ _id, authorId }, req.body)
      .then(answer => {
        if (!answer) {
          res.status(404);
          throw new Error(`Answer is not found!`);
        } else {
          res.status(200).json({
            message: `Answer is successfully updated!`
          });
        }
      })
      .catch(err => next(err));
  }

  static userUpvote(req, res, next) {
    const { userId } = req.userData;
    const { answerId } = req.params;

    Answer.findById(answerId)
      .then(answer => {
        let flagUser = false;
        answer.upvote.forEach(user => {
          if (String(user) === userId) {
            answer.upvote.pull(userId);
            flagUser = true;
            // throw new Error(`This user already upvote!`);
          }
        });

        answer.downvote.forEach(user => {
          if (String(user) === userId) {
            question.downvote.pull(userId);
            // throw new Error(`This user already downvote!`);
          }
        });

        if (!flagUser) {
          answer.upvote.push(userId);
        }

        return answer.save();
      })
      .then(() =>
        res.status(200).json({
          message: `User successfully upvote the answer!`
        })
      )
      .catch(err => next(err));
  }

  static userDownvote(req, res, next) {
    const { userId } = req.userData;
    const { answerId } = req.params;

    Answer.findById(answerId)
      .then(answer => {
        let flagUser = false;
        answer.upvote.forEach(user => {
          if (String(user) === userId) {
            answer.upvote.pull(userId);
            // throw new Error(`This user already upvote!`);
          }
        });

        answer.downvote.forEach(user => {
          if (String(user) === userId) {
            answer.downvote.pull(userId);
            flagUser = true;
            // throw new Error(`This user already downvote!`);
          }
        });

        if (!flagUser) {
          answer.downvote.push(userId);
        }

        return answer.save();
      })
      .then(() =>
        res.status(200).json({
          message: `User successfully downvote the answer!`
        })
      )
      .catch(err => next(err));
  }

  static userUnvote(req, res, next) {
    const { userId } = req.userData;
    const { answerId } = req.params;

    Answer.findById(answerId)
      .then(answer => {
        answer.upvote = answer.upvote.filter(user => {
          return String(user) !== userId;
        });

        answer.downvote = answer.downvote.filter(user => {
          return String(user) !== userId;
        });

        return answer.save();
      })
      .then(() =>
        res.status(200).json({
          message: `User successfully unvote the answer!`
        })
      )
      .catch(err => next(err));
  }

  static delete(req, res, next) {
    const { answerId: _id } = req.params;
    const { userId: authorId } = req.userData;
    Answer.findOneAndDelete({ _id, authorId })
      .then(answer => {
        if (!answer) {
          res.status(404);
          throw new Error(`Answer is not found!`);
        } else {
          res.status(200).json({
            message: `Answer is successfully removed!`
          });
        }
      })
      .catch(err => next(err));
  }
}

module.exports = AnswerController;
