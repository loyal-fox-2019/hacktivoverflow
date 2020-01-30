const Question = require('../models/question')
const { ObjectId } = require('mongoose').Types
function authorize(req, res, next) {
  Question.findOne({
    _id: ObjectId(req.params.id)
  })
    .then((question) => {
      if (!question) {
        let err = {
          name: 'Not Found',
          message: 'Item is not found'
        }
        next(err)
      } else {
        if (question.author != req.userInfo.id) {
          let err = {
            name: 'Forbidden Access',
            message: 'Forbidden Access: Unauthorized User'
          }
          next(err)
        } else {
          next()
        }
      }
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = authorize
