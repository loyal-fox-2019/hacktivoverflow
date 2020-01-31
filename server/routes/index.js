const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const thirdAPIRouter = require('./third-api-router')
const questionRouter = require('./question-router')
const answerRouter = require('./answer-router')
const voteRouter = require('./vote-router')
const { authenticate } = require('../middlewares/auth')

router.get('/', function(req, res, next) {
  res.json({ message: 'Server alive!' })
})
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use('/third-api-login', thirdAPIRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)
router.use('/votes', voteRouter)
router.get('/users', authenticate, UserController.getUserDetail)
router.post('/tags', authenticate, UserController.addTag)

module.exports = router
