const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const upload = require('../middlewares/gcs-upluad')

router.post('/', authenticate, AnswerController.create)
router.get('/:questionId', authenticate, AnswerController.findAll)
router.get('/:answerId', authenticate, AnswerController.findOne)
router.put('/:answerId', authenticate, authorization, AnswerController.update)
router.delete('/:answerId', authenticate, authorization, AnswerController.delete)
router.patch('/upvote/:answerId', authenticate, AnswerController.upvote)
router.patch('/downvote/:answerId', authenticate, AnswerController.downvote)

module.exports = router