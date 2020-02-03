module.exports = function(payload) {
  const jwt = require('jsonwebtoken')
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return token
}
