const User = require('../models/User')

class QuestionController {
  static async getAll(req, res, next) {
    try {
      let tags = await User
        .findById(req.decodedId)
      res.status(200).json(tags)
    } catch (error) {
      next(error)
    }
  }
  static async create(req, res, next) {
    try {
      const {tags} = req.body
      let result = await User
        .findByIdAndUpdate(req.decodedId,
        { $set: {watchedTags: tags}},
        {new: true}
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = QuestionController