const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const authenticate = require('../middlewares/authentication')

router.post('/', authenticate, AnswerController.create)
router.get('/', authenticate, AnswerController.findAll)
router.get('/:answerId', authenticate, AnswerController.findOne)
router.put('/:answerId', authenticate, AnswerController.update)
router.delete('/:answerId', authenticate, AnswerController.delete)

module.exports = router