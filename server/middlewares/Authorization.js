const Question = require('../models/question')

module.exports = (req, res, next) => {
  const id = req.loggedIn.id
  console.log(id)
  try {
    console.log('masuk try')
    Question.findOne({ user_id: id }).then(result => {
      console.log(result)
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
