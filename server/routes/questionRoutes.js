const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const authenticate = require('../middlewares/authentication')

router.post('/', authenticate, QuestionController.create)
router.get('/', authenticate, QuestionController.findAll)
router.get('/:questionId', authenticate, QuestionController.findOne)
router.put('/:questionId', authenticate, QuestionController.update)
router.delete('/:questionId', authenticate, QuestionController.delete)
router.put('/:questionId', authenticate, QuestionController.upvote)

module.exports = router