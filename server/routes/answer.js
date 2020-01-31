const express = require('express')
const router = express.Router()
const AnswerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')
const answerAuthorization = require('../middlewares/answerAuthorization')

router.get('/:questionId', AnswerController.findByQuestionId)
router.post('/', authentication, AnswerController.create)
router.patch('/editAnswer/:answerId', authentication, answerAuthorization, AnswerController.update)
router.patch('/editVote/:answerId', authentication, AnswerController.vote)

module.exports = router