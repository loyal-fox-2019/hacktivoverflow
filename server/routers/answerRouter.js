const router = require('express').Router()
const {authentication, answerAuthorization} = require('../middlewares/auth')
const AnswerController = require('../controllers/answerController')

router.get('/:id', AnswerController.getOne)
router.use(authentication)
router.post('/:questionId', AnswerController.create)
router.patch('/:id', answerAuthorization, AnswerController.update)
router.delete('/:id', answerAuthorization, AnswerController.delete)
router.patch('/:id/vote', authentication, AnswerController.vote)

module.exports = router