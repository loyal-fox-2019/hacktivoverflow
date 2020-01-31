const Model = require("../models/answer");

class Answer {
  static upvote(req, res, next) {
    Model.findOne({ _id: req.params.id })
      .then(answer => {
        console.log(answer);
        if (!answer.upvote.includes(req.loginData.id)) {
          return Model.updateOne(
            { _id: req.params.id },
            {
              $push: { upvote: req.loginData.id },
              $pull: { downvote: req.loginData.id }
            }
          );
        } else {
          return Model.updateOne(
            { _id: req.params.id },
            {
              $pull: { upvote: req.loginData.id }
            }
          );
        }
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
  static downvote(req, res, next) {
    Model.findOne({ _id: req.params.id })
      .then(answer => {
        if (!answer.downvote.includes(req.loginData.id)) {
          return Model.updateOne(
            { _id: req.params.id },
            {
              $push: { downvote: req.loginData.id },
              $pull: { upvote: req.loginData.id }
            }
          );
        } else {
          return Model.updateOne(
            { _id: req.params.id },
            {
              $pull: { downvote: req.loginData.id }
            }
          );
        }
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
  static getAllAnswer(req, res, next) {
    Model.find({})
      .then(answers => {
        res.status(200).json(answers);
      })
      .catch(next);
  }
  static createAnswer(req, res, next) {
    Model.create({
      description: req.body.description,
      questionId: req.body.questionId,
      userId: req.loginData.id
    })
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }
  static editAnswer(req, res, next) {
    Model.findByIdAndUpdate(req.params.id, {
      description: req.body.description
    })
      .then(updated => {
        if (updated) {
          res.status(200).json({ message: "Answer Edited" });
        } else {
          let err = {
            name: "Not Found",
            message: "Answer Not Found"
          };
        }
      })
      .catch(next);
  }
  static getAnswerByQuestion(req, res, next) {
    Model.find({ questionId: req.params.questionid })
      .populate("userId", "username")
      .then(answerList => {
        res.status(200).json(answerList);
      })
      .catch(next);
  }
  static deleteAnswer(req, res, next) {
    Model.deleteMany({ questionId: req.params.questionId })
      .then(deleted => {
        res.status(200).json({ message: "Answer Deleted" });
      })
      .catch(next);
  }
}

module.exports = Answer;
