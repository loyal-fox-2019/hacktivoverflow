const router = require('express').Router()
const AnswerController = require('../controllers/answer-controller')
const { authenticate, authorizeAnswer } = require('../middlewares/auth')

router.use(authenticate)
router.post('/', AnswerController.addAnswer)
router.use(authorizeAnswer)
router.patch('/', AnswerController.editAnswer)
router.delete('/', AnswerController.deleteAnswer)

module.exports = router
