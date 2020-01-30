const router = require('express').Router()
const QuestionController = require('../controllers/questionController')
const Authenticate = require('../middlewares/Authentication')
const Authorize = require('../middlewares/Authorization')

router.get('/', QuestionController.findAll)
router.get('/:id', QuestionController.findOne)
router.get('/:user_id', Authenticate,  Authorize, QuestionController.findUserQuestion)

router.post('/', Authenticate, QuestionController.addQuestion)
router.put('/:id', Authenticate, Authorize, QuestionController.updateQuestion)
router.patch('/upvote/:id', Authenticate, QuestionController.updateVote)
router.patch('/downvote/:id', Authenticate, QuestionController.downvote)
router.delete('/:id', Authenticate, Authorize, QuestionController.deleteOne)
router.patch('/click/:id', QuestionController.addView)

module.exports = router
