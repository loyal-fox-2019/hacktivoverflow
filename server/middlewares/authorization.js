'use strict';
const { Question } = require('../models');

module.exports =  async (req, res, next) => {
  const { id } = req.token;
  const question = await Question.findOne({ _id: req.params.id }).populate({ path: 'userId' })
  if ( id == question.userId._id) {
    next();
  } else {
    next({ auth: true, status: 401, message: 'Unauthorized' });
  }
}
