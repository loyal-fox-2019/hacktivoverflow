const mongoose = require('mongoose');
const { JsonWebTokenError } = require('jsonwebtoken');

function errorHandler(err, req, res, next) {
  if (err instanceof JsonWebTokenError) {
    res.status(400);
  }
  else if (err instanceof mongoose.Error) {
    res.status(503);
  }
  res.json(err);
}

module.exports = errorHandler;