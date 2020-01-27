'use strict';
const { Question } = require('../models');

class QuestionController {

  static async createQuestion(req, res, next) {
    try {
      const { title, description, tags } = req.body;
      const doc = {
        title,
        description,
        tags
      };
      const response = await Question.create(doc);
      const { _id, title } = response;
      res.status(201).json({ id: _id, title });
    } catch (err) {
      next(err);
    }
  }

  static editQuestion(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, tags } = req.body;
      const doc = {
        title,
        description,
        tags,
      };
      const response = await Question.updateOne({ _id: id }, doc)
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuestionController;
