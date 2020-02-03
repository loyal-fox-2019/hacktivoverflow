const Answer = require('../models/answer')
const { ObjectId } = require('mongoose').Types
function authorize(req, res, next) {
  Answer.findOne({
    _id: ObjectId(req.params.id)
  })
    .then((answer) => {
      if (!answer) {
        let err = {
          name: 'Not Found',
          message: 'Item is not found'
        }
        next(err)
      } else {
        if (answer.author != req.userInfo.id) {
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
