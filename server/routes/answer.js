const route = require('express').Router()
const controller = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')

route.get('/', controller.getAllAnswers)

route.use(authentication)

route.get('/myAnswer', controller.myAnswers)

route.put('/:answerId', controller.updateAnswer)

route.post('/:questionId', controller.addAnswer)

route.patch('/:answerId', controller.upVote)

route.patch('/:answerId/downVote', controller.downVote)

module.exports = route