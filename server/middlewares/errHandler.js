'use strict';
module.exports = function(err, req, res, next) {
  const stringifiedErr = JSON.stringify(err);
  if (err.code === 404) {
    res.status(err.code).json({
      message: err.resource + ' not found',
    });
  } 
  else if (stringifiedErr.indexOf('ValidatorError') !== -1 || stringifiedErr.indexOf('ValidationError') !== -1) {
    const mongooseErrors = err.errors;
    const errors = [];

    for (let key in mongooseErrors) {
      errors.push(mongooseErrors[key].message);
    }

    res.status(400).json({ errors });
  } else if (stringifiedErr.indexOf('E11000') !== -1) {
    let errors = null;

    if (stringifiedErr.indexOf('username') !== -1) {
      errors = ['Username is already in use'];
    }
    res.status(400).json({ errors });
  } else if (err.auth) {
    let errors = null;
    errors = [err.message];
    res.status(err.status).json({ errors });
  } else {
    console.log(err);

    res.status(500).json({
      message: 'Internal server error, check the console',
    });
  }
};
