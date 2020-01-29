const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const authenticate = require('../middlewares/authentication')

router.post('/', authenticate, QuestionController.create)
router.get('/', authenticate, QuestionController.findAll)
router.get('/user', authenticate, QuestionController.findAllUser)
router.get('/:questionId', authenticate, QuestionController.findOne)
router.put('/:questionId', authenticate, QuestionController.update)
router.delete('/:questionId', authenticate, QuestionController.delete)
router.patch('/upvote/:questionId', authenticate, QuestionController.upvote)
router.patch('/downvote/:questionId', authenticate, QuestionController.downvote)

module.exports = router