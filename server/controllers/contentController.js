const Content = require('../models/content')
const mongoose = require('mongoose')
module.exports = class {
  static addContent(req, res, next) {
    let content2create = {
      user: req.body.user._id,
      judul: req.body.judul,
      keterangan: req.body.keterangan,
      tags: req.body.tags,
      like: [],
      dislike: [],
      comment: []
    }
    Content.create(content2create)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static getUserContent(req, res, next) {
    let userId = req.body.user._id

    Content.find({
      user: userId
    })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static findbyId(req, res, next) {
    Content.findById(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateContent(req, res, next) {
    Content.findByIdAndUpdate(req.params.id, {
      judul: req.body.judul,
      keterangan: req.body.keterangan,
      tags: req.body.tags
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteOne(req, res, next) {
    Content.findByIdAndDelete(req.params.id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static getAll(req, res, next) {
    Content.find()
      .populate('user')
      .populate('comment.user')
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static addComment(req, res, next) {
    Content.findByIdAndUpdate(req.params.id, {
      $push: {
        comment: {
          user: req.body.user._id,
          answer: req.body.answer,
          like: [],
          dislike: []
        }
      }
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static likeAnswer(req, res, next) {
    const commentId = req.params.commentId
    const userId = req.body.user._id
    console.log(commentId)

    Content.findOne({
      'comment._id': commentId
    })
      .then(data => {
        // console.log(data.like.includes(contentId))
        console.log(data)
        console.log('ini datanya', data.comment)

        function dapetinIndex(item) {
          return (item._id = commentId)
        }

        let index = data.comment.findIndex(dapetinIndex)
        // `comment[${index}]._id` = commentId
        if (data.comment[index].like.includes(userId) == false) {
          return Content.update(
            {
              'comment._id': commentId
            },
            {
              $push: {
                'comment.$.like': userId
              },
              $pull: {
                'comment.$.dislike': userId
              }
            }
          )
        } else {
          // console.log('masuk else')
          return Content.findOne(
            {
              'comment._id': commentId
            },
            {
              $pull: {
                'comment.$.like': userId
              }
            }
          )
        }
      })
      .then(data => {
        console.log('dari sini')

        console.log(data)

        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)

        next(err)
      })
  }

  static dislikeAnswer(req, res, next) {
    const commentId = req.params.commentId
    const userId = req.body.user._id
    console.log(commentId)

    Content.findOne({
      'comment._id': commentId
    })
      .then(data => {
        // console.log(data.like.includes(contentId))
        console.log(data)
        console.log('ini datanya', data.comment)

        function dapetinIndex(item) {
          return (item._id = commentId)
        }

        let index = data.comment.findIndex(dapetinIndex)
        // `comment[${index}]._id` = commentId
        if (data.comment[index].dislike.includes(userId) == false) {
          return Content.update(
            {
              'comment._id': commentId
            },
            {
              $push: {
                'comment.$.dislike': userId
              },
              $pull: {
                'comment.$.like': userId
              }
            }
          )
        } else {
          // console.log('masuk else')
          return Content.findOne(
            {
              'comment._id': commentId
            },
            {
              $pull: {
                'comment.$.dislike': userId
              }
            }
          )
        }
      })
      .then(data => {
        console.log('dari sini')

        console.log(data)

        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)

        next(err)
      })
  }

  static likeQuestion(req, res, next) {
    const contentId = req.params.id
    const userId = req.body.user._id
    Content.findById(contentId)
      .then(data => {
        // console.log(data.like.includes(contentId))
        if (data.like.includes(userId) == false) {
          return Content.findByIdAndUpdate(contentId, {
            $push: {
              like: userId
            },
            $pull: {
              dislike: userId
            }
          })
        } else {
          // console.log('masuk else')
          return Content.findByIdAndUpdate(contentId, {
            $pull: {
              like: userId
            }
          })
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static dislikeQuestion(req, res, next) {
    const contentId = req.params.id
    const userId = req.body.user._id
    Content.findById(contentId)
      .then(data => {
        // console.log(data.dislike.includes(contentId))
        if (data.dislike.includes(userId) == false) {
          return Content.findByIdAndUpdate(contentId, {
            $push: {
              dislike: userId
            },
            $pull: {
              like: userId
            }
          })
        } else {
          // console.log('masuk else')
          return Content.findByIdAndUpdate(contentId, {
            $pull: {
              dislike: userId
            }
          })
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}
