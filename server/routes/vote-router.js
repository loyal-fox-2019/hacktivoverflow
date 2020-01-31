const router = require('express').Router()
const VoteController = require('../controllers/vote-controller')
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)
router.post('/question', VoteController.pushVoteToQuestion)
router.post('/answer', VoteController.pushVoteToAnswer)

module.exports = router
