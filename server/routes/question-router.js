const router = require('express').Router()
const QuestionController = require('../controllers/question-controller')
const { authenticate, authorizeQuestion } = require('../middlewares/auth')

router.get('/', QuestionController.getAllQuestions)
router.get('/:questionId', QuestionController.getQuestionDetail)
router.use(authenticate)
router.post('/', QuestionController.addQuestion)
router.use('/:questionId', authorizeQuestion)
router.patch('/:questionId', QuestionController.editQuestion)
router.delete('/:questionId', QuestionController.deleteQuestion)

module.exports = router
