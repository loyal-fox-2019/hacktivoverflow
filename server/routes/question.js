const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')
const questionAuthorization = require('../middlewares/questionAuthorization')

router.get('/', QuestionController.getAll)
router.get('/:questionId', QuestionController.getById)
router.post('/', authentication, QuestionController.create)
router.patch('/editPost/:questionId', authentication, questionAuthorization, QuestionController.update)
router.patch('/editVote/:questionId', authentication, QuestionController.vote)
router.delete('/:questionId', authentication, questionAuthorization, QuestionController.delete)

module.exports = router