const express = require('express')
const route = express.Router()
const AnswerCon = require('../controllers/AnswerCon')
const { authenticate } = require('../middlewares/auth')
const { answerAuth } = require('../middlewares/answerAuth')

route.get('/:id', AnswerCon.findAll)
route.use(authenticate)
route.get('/', AnswerCon.myAnswer)
route.post('/', AnswerCon.add)
route.put('/:id', answerAuth ,AnswerCon.update)
route.patch('/up/:id',AnswerCon.upVote)
route.patch('/down/:id',AnswerCon.downVote)
route.delete('/:id',answerAuth,AnswerCon.destroy)


module.exports = route