const express = require('express')
const route = express.Router()
const AnswerCtr = require('../controllers/answer')
const {authenticate,authorizeAnswer} = require('../middlewares/auth')

route.get('/:id', AnswerCtr.getAnswers)
route.use(authenticate)
route.get('/', AnswerCtr.myAnswer)
route.post('/', AnswerCtr.create)
route.put('/:id',authorizeAnswer,AnswerCtr.edit)
route.patch('/up/:id',AnswerCtr.upVote)
route.patch('/down/:id',AnswerCtr.downVote)


module.exports = route