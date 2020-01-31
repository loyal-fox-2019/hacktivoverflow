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
          if (question.votes[voteIndex].value == req.body.value) {
            if (req.body.value == 1) {
              question.votes[voteIndex].value -= 1
            }

            if (req.body.value == -1) {
              question.votes[voteIndex].value += 1
            }
          } else {
            question.votes[voteIndex].value = req.body.value
          }

          if (question.votes[voteIndex].value == 0) {
            question.votes = question.votes.filter(vote => {
              return vote.owner != req.payload.id
            })
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
          // not found, push it
          answer.votes.push({
            owner: req.payload.id,
            value: req.body.value,
          })
        } else {
          if (answer.votes[voteIndex].value == req.body.value) {
            if (req.body.value == 1) {
              answer.votes[voteIndex].value -= 1
            }

            if (req.body.value == -1) {
              answer.votes[voteIndex].value += 1
            }
          } else {
            answer.votes[voteIndex].value = req.body.value
          }

          if (answer.votes[voteIndex].value == 0) {
            answer.votes = answer.votes.filter(vote => {
              return vote.owner != req.payload.id
            })
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
