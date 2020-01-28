const router = require('express').Router()
const QuestionController = require('../controllers/question-controller')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', QuestionController.getAllQuestions)
router.use(authenticate)
router.post('/', QuestionController.addQuestion)
router.use('/:questionId', authorize)
router.patch('/:questionId', QuestionController.editQuestion)
router.delete('/:questionId', QuestionController.deleteQuestion)

module.exports = router
