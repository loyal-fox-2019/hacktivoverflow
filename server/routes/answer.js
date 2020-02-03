const answerRouter = require('express').Router()

const ControllerAnswer = require('../controllers/answer')

const authenticate = require('../middlewares/authenticate')

answerRouter.get('/question/:id', ControllerAnswer.find)

answerRouter.use(authenticate)

answerRouter.post('/', ControllerAnswer.create)

answerRouter.get('/answer/:id', ControllerAnswer.findOne)

answerRouter.get('/lists', ControllerAnswer.findOwn)

answerRouter.post('/upvote/:id', ControllerAnswer.upvote)

answerRouter.post('/downvote/:id', ControllerAnswer.downvote)

const authorize = require('../middlewares/authorize-answer')

answerRouter.put('/update/:id', authorize, ControllerAnswer.update)

module.exports = answerRouter
