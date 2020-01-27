'use strict';
const { Question, Answer } = require('../models');

class QuestionController {

  static async getQuestions(req, res, next) {
    try {
      const resultPerPage = 5;
      const { page } = req.query;
      const response = await Question.find()
        .populate({ path: 'userId', select: 'username -_id' })
        .skip((resultPerPage * page) - resultPerPage )
        .limit(resultPerPage)
        .sort({ createdAt: -1 })
      const showing = response.length;
      res.status(200).json({ response, showing });
    } catch (err) {
      next(err);
    }
  }

  static async createQuestion(req, res, next) {
    try {
      const { id } = req.token;
      const { title, description, tags } = req.body;
      const doc = {
        userId: id,
        title,
        description,
        tags
      };
      const response = await Question.create(doc);
      const { _id, } = response;
      res.status(201).json({ id: _id, title });
    } catch (err) {
      next(err);
    }
  }

  static async editQuestion(req, res, next) {
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

  static async upvotes(req, res, next) {
    try {
      const { id } = req.token;
      const check = await Question.findOne({ _id: req.params.id }).populate({ path: 'userId', select: '-password'})
      if (id == check.userId._id) {
        next({ auth: true, status: 403, message: 'You cannot upvotes your own question' })
      } else {
        const response = await Question.updateOne(
          { _id: req.params.id },
          { $inc: { upvotes: 1 } }
        )
        res.status(200).json(response);
      }
    } catch (err) {
      next(err);
    }
  }

  static async downvotes(req, res, next) {
    try {
      const { id } = req.token;
      const check = await Question.findOne({ _id: req.params.id }).populate({ path: 'userId', select: '-password'})
      if (id == check.userId._id) {
        next({ auth: true, status: 403, message: 'You cannot downvotes your own question' })
      } else {
        const response = await Question.updateOne(
          { _id: req.params.id },
          { $inc: { downvotes: 1 } }
        )
        res.status(200).json(response);
      }
    } catch (err) {
      next(err);
    }
  }

  static async removeQuestion(req, res, next) {
    try {
      const { id } = req.params;
      await Answer.deleteMany({ questionId: id })
      const remove = await Question.deleteOne({ _id: id });
      res.status(200).json(remove);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuestionController;
