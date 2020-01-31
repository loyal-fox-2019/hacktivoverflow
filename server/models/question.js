'use strict'

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    tags: [{type: String}],
    upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    downvotes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    answers: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Question", QuestionSchema);