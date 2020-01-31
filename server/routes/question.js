const router = require('express').Router()
const questionController = require('../controllers/question')
const { authentication, questionAuthorization } = require('../middlewares/auth')

router.post('/', authentication, questionController.create)

router.get('/', questionController.getAllQuestion)

router.get('/mine', authentication, questionController.getMyQuestion)

router.get('/:id', questionController.getSingleQuestion)

router.patch('/:id', authentication, questionAuthorization, questionController.updateQuestion)

router.patch('/upvote/:id', authentication, questionController.increaseVote)

router.patch('/downvote/:id', authentication, questionController.decreaseVote)

router.delete('/:id', authentication, questionAuthorization, questionController.delete)

module.exports = router