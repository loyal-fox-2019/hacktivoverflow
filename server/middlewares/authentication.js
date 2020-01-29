const Token = require('../helpers/token');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  try {
    const [_, token] = authorization.split(' ');
    const payload = Token.verify(token);
    req.userData = payload;
    next();
  } catch (err) {
    console.log(err.stack);
    res.status(403);
    next(err);
  }
};
