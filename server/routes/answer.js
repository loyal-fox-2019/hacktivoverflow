const express = require('express')
const router = express.Router()
const AnswerController = require('../controllers/answer')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorizeAnswerOwner')

router.get('/:questionId', AnswerController.getAnswer)

router.use(authenticate)
router.post('/vote/:answerId', AnswerController.vote)
router.post('/:questionId', AnswerController.create)

router.use('/:answerId', authorize)
router.patch('/:answerId', AnswerController.edit)


module.exports = router