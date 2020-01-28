const Question = require('../models/user')

module.exports = (req, res, next) => {
  try {
    const id = req.loggedIn.id
    Question.findOne({ user_id: id }).then(result => {
      if (result) {
        next()
      } else {
        throw new Error('Sorry you are not authorized to do this action')
      }
    })
  } catch (err) {
    res.status(403).json({
      message: 'Sorry you are not authorized to do this action',
      err
    })
  }
}
