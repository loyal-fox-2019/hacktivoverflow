'use strict';

const { Answer } = require('../models');

class AnswerController {

  static async upvotes(req, res, next) {
    const { id } = req.params;
    const check = await Answer.findOne({ _id: id })
    if (check.userId == req.token.id) {
      next({ auth: true, status: 400, message: 'You cannot vote your answer' })
    }
    try {
      await Answer.updateOne({ _id: id }, { $inc: { upvotes: 1 } });
      res.status(200).json({ message: 'thankyou'});
    } catch (err) {
      next(err);
    }
  }

  static async downvotes(req, res, next) {
    const { id } = req.params;
    const check = await Answer.findOne({ _id: id })
    if (check.userId == req.token.id) {
      next({ auth: true, status: 400, message: 'You cannot vote your answer' })
    }
    try {
      await Answer.updateOne({ _id: id }, { $inc: { downvotes: 1 } });
      res.status(200).json({ message: 'thankyou'});
    } catch (err) {
      next(err);
    }
  }

  static async getAnswer(req, res, next) {
    try {
      const response = await Answer.find({ questionId: req.params.questionId })
        .populate({
          path: 'userId',
          select: '-_id -password',
        });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async answerQuestion(req, res, next) {
    try {
      const { title, description } = req.body;
      const { questionId } = req.params;
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