const Model = require("../models/answer");

class Answer {
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
      .populate("questionId", "description")
      .then(answerList => {
        res.status(200).json(answerList);
      })
      .catch(next);
  }
}

module.exports = Answer;
