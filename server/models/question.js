const { model, Schema } = require("mongoose");

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Question = model("Question", questionSchema);
module.exports = Question;
