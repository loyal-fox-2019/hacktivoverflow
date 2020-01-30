const router = require('express').Router(),
  AnswerController = require('../controllers/answer'),
  { authenticate, answerAuthorize } = require('../middlewares/auth')

router.get('/', AnswerController.all)
// router.get('/:id', AnswerController.question) // id question
router.use(authenticate)
router.post('/:id', AnswerController.create) // id question
router.patch('/:id/upvote', AnswerController.upvote)
router.patch('/:id/downvote', AnswerController.downvote)
router.put('/:id', answerAuthorize, AnswerController.update)
router.delete('/:id', answerAuthorize, AnswerController.destroy) // id answer


module.exports = router
