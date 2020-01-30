const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/question')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorizeQuestionOwner')

router.get('/', QuestionController.showAll)
router.get('/tags', QuestionController.searchTag)
router.get('/:questionId', QuestionController.showOne)

router.use(authenticate)
router.post('/vote/:questionId', QuestionController.vote)
router.post('/', QuestionController.create)

router.use('/:questionId', authorize)
router.patch('/:questionId', QuestionController.edit)
router.delete('/:questionId', QuestionController.delete)


module.exports = router