const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    judul: {
      type: String,
      required: [true, 'Judul harus diisi']
    },
    keterangan: {
      type: String,
      required: [true, 'Keterangan harus diisi']
    },
    tags: [
      {
        type: String,
        required: [true, 'Tags harus diisi']
      }
    ],
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    dislike: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    comment: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        answer: {
          type: String
        },
        like: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ],
        dislike: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ]
      }
    ]
  },
  {
    versionKey: false
  }
)

module.exports = mongoose.model('Content', contentSchema)
