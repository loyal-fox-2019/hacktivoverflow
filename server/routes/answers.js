const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const {authenticate, authorizeAnswer} = require('../middlewares/auth')

router.get('/', AnswerController.getAll)

router.use(authenticate)
router.post('/', AnswerController.create)
router.patch('/:id', AnswerController.edit)
router.patch('/:id/vote', AnswerController.vote)
router.delete('/:id', authorizeAnswer, AnswerController.delete)

module.exports = router