const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')
const questionAuthorization = require('../middlewares/questionAuthorization')

router.get('/', QuestionController.getAll)
router.post('/', authentication, QuestionController.create)
router.get('/questionId/:questionId', QuestionController.getById)
router.get('/userQuestion', authentication, QuestionController.getUserQuestions)
router.delete('/:questionId', authentication, questionAuthorization, QuestionController.delete)
router.patch('/editPost/:questionId', authentication, questionAuthorization, QuestionController.update)
router.patch('/editVote/:questionId', authentication, QuestionController.vote)

module.exports = router