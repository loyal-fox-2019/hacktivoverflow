const Model = require("../models/question");

class Question {
  static createQuestion(req, res, next) {
    Model.create({
      userId: req.loginData.id,
      title: req.body.title,
      description: req.body.description
    })
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }
  static editQuestion(req, res, next) {
    Model.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description
    })
      .then(updated => {
        if (!updated) {
          let err = {
            name: "Not Found",
            message: "Question Not Found"
          };
          throw err;
        } else {
          res.status(200).json({ message: "Question Updated" });
        }
      })
      .catch(next);
  }
  static deleteQuestion(req, res, next) {
    Model.findByIdAndDelete(req.params.id)
      .then(deleted => {
        if (!deleted) {
          let err = {
            name: "Not Found",
            message: "Question Not Found"
          };
          throw err;
        } else {
          res.status(200).json({ message: "Question Deleted" });
        }
      })
      .catch(next);
  }
  static getAllQuestion(req, res, next) {
    Model.find({})
      .then(QuestionList => {
        res.status(200).json(QuestionList);
      })
      .catch(next);
  }
  static getQuestionById(req, res, next) {
    Model.findById(req.params.id)
      .then(question => {
        res.status(200).json(question);
      })
      .catch(next);
  }
}

module.exports = Question;
