const router = require('express').Router(),
  QuestionController = require('../controllers/question'),
  { authenticate, questionAuthorize } = require('../middlewares/auth')

router.get('/', QuestionController.all)
router.get('/:id', QuestionController.one)
router.use(authenticate)
router.post('/', QuestionController.create)
router.patch('/:id/upvote', QuestionController.upvote)
router.patch('/:id/downvote', QuestionController.downvote)
router.put('/:id', questionAuthorize, QuestionController.update)
// router.delete('/:id', questionAuthorize, QuestionController.destroy)
router.delete('/:id', questionAuthorize, QuestionController.remove)

module.exports = router
