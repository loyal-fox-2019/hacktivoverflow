const { model, Schema } = require("mongoose");

const answerSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  upvote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  downvote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Answer = model("Answer", answerSchema);
module.exports = Answer;
