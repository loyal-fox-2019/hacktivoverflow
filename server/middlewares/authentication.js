'use strict';
const { User } = require('../models');
const { verify } = require('../helpers/jwt');

module.exports =  async (req, res, next) => {
  console.log(req.headers, 'dari auth');
  const { token } = req.headers;
  if (!token) {
    next({ auth: true, status: 403, message: 'You have to login' });
  } else {
    const payload = verify(token)
    const { id } = payload;
    const user = await User.findOne({ _id: id })
    if (!user) {
      next({ auth: true, status: 403, message: 'Token not valid' })
    } else {
      req.token = payload;
      next();
    }
  }
}
