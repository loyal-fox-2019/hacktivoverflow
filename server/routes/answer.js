const router = require('express').Router(),
  AnswerController = require('../controllers/answer'),
  { authenticate } = require('../middlewares/auth')

router.get('/', AnswerController.all)
router.get('/:id', AnswerController.question) // id question
router.use(authenticate)
router.post('/:id', AnswerController.create) // id question
// router.post('/', AnswerController.create)

module.exports = router
