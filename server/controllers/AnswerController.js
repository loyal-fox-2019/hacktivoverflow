'use strict';

const { Answer } = require('../models');

class AnswerController {

  static async answerQuestion(req, res, next) {
    try {
      const { title, description, questionId } = req.body;
      const { id } =req.token;
      const doc = {
        userId: id,
        questionId,
        title,
        description
      }
      const response = await Answer.create(doc);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = AnswerController;