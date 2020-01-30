const router = require('express').Router()
const AnswerQuestion = require('../controllers/answerController')
const Authenticate = require('../middlewares/Authentication')
const Authorize = require('../middlewares/Authorization')

router.get('/:id', AnswerQuestion.getAll)

router.post('/:id', Authenticate, AnswerQuestion.addAnswer)
router.put('/:id', Authenticate, Authorize, AnswerQuestion.updateAnswer )
router.patch('/upvote/:id', Authenticate, AnswerQuestion.updateVote)
router.patch('/downvote/:id', Authenticate, AnswerQuestion.downvote)

module.exports = router
