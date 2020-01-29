const Question = require('../models/question')

class VoteController {
  static pushVoteToQuestion(req, res, next) {
    Question.findOne({ _id: req.body.questionId })
      .then(question => {
        if (!question) {
          throw { name: 'NotFound', message: 'Question not found' }
        }

        const voteIndex = question.votes.findIndex(vote => {
          return vote.owner == req.payload.id
        })

        if (voteIndex == -1) {
          // not found, push it
          question.votes.push({
            owner: req.payload.id,
            value: req.body.value,
          })
        } else {
          question.votes[voteIndex].value += Number(req.body.value)

          if (question.votes[voteIndex].value < -1) {
            question.votes[voteIndex].value = -1
          }

          if (question.votes[voteIndex].value > 1) {
            question.votes[voteIndex].value = 1
          }
        }

        return question.save()
      })
      .then(() => {
        res.json({ message: 'Vote added' })
      })
      .catch(next)
  }

  static pushVoteToAnswer(req, res, next) {
    if (!req.body.answerId) {
      return next({ name: 'BadRequest', message: 'Answer Id is required' })
    }

    Question.findOne({ _id: req.body.questionId })
      .then(question => {
        if (!question) {
          throw { name: 'NotFound', message: 'Question not found' }
        }

        let answer = question.answers.id(req.body.answerId)

        if (!answer) {
          throw { name: 'NotFound', message: 'Answer not found' }
        }

        const voteIndex = answer.votes.findIndex(vote => {
          return vote.owner == req.payload.id
        })

        if (voteIndex == -1) {
          // push it
          answer.votes.push({
            value: req.body.value,
            owner: req.payload.id,
          })
        } else {
          answer.votes[voteIndex].value += Number(req.body.value)

          if (answer.votes[voteIndex].value < -1) {
            answer.votes[voteIndex].value = -1
          }

          if (answer.votes[voteIndex].value > 1) {
            answer.votes[voteIndex].value = 1
          }
        }

        return question.save()
      })
      .then(() => {
        res.json({ message: 'Votes added' })
      })
      .catch(next)
  }
}

module.exports = VoteController
