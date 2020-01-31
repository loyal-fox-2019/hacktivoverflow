const questionRouter = require('express').Router()

const ControllerQuestion = require('../controllers/question')

const authenticate = require('../middlewares/authenticate')

questionRouter.get('/', ControllerQuestion.find)

questionRouter.get('/:id', ControllerQuestion.findOne)

questionRouter.use(authenticate)

questionRouter.get('/lists', ControllerQuestion.findOwn)

questionRouter.post('/', ControllerQuestion.create)

questionRouter.post('/upvote/:id', ControllerQuestion.upvote)

questionRouter.post('/downvote/:id', ControllerQuestion.downvote)

const authorize = require('../middlewares/authorize-question')

questionRouter.put('/update/:id', ControllerQuestion.update)

questionRouter.delete('/delete/:id', authorize, ControllerQuestion.delete)

module.exports = questionRouter
