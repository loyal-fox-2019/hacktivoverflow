const route = require('express').Router()
const controller = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')

route.get('/', controller.getAllQuestions)

route.get('/myQuestions', authentication, controller.findMyQuestions)

route.get('/:questionId', controller.findOneQuestion)

route.use(authentication)

route.post('/', controller.askQuestion)

route.delete('/:questionId', controller.deleteQuestion)

route.put('/:questionId', controller.editQuestion)

route.patch('/:questionId', controller.upVote)

route.patch('/:questionId/downVote', controller.downVote)

module.exports = route