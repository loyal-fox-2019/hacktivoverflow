const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.token
  console.log(token)
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    req.loggedIn = verify
    next()
  } catch (err) {
    res.status(403).json({
      message: 'Sorry you are not authorized, please login first'
    })
  }
}
