const router = require('express').Router()
const answerController = require('../controllers/answer')
const { authentication, answerAuthorization } = require('../middlewares/auth')

router.post('/:id', authentication, answerController.createAnswer)  // id punya question

router.get('/', answerController.getAll)

router.get('/:id', answerController.showQuestionAnswers) // id punya question

router.patch('/:id', authentication, answerAuthorization, answerController.updateAnswer) // id punya answer

router.patch('/upvote/:id', authentication, answerController.increaseVote) // id punya answer

router.patch('/downvote/:id', authentication, answerController.decreaseVote) // id punya answer

module.exports = router