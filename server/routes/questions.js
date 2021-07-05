const express = require('express')
const route = express.Router()
const QuestionCtr = require('../controllers/question')
const { authenticate,authorizeQuestion } = require('../middlewares/auth')

route.get('/', QuestionCtr.getQuestions)
route.get('/myQuestion', authenticate ,QuestionCtr.myQuestion)
route.get('/:id',QuestionCtr.findOne)
route.use(authenticate)
route.post('/', QuestionCtr.create)
route.put('/:id',authorizeQuestion ,QuestionCtr.edit)
route.patch('/up/:id',QuestionCtr.upVote)
route.patch('/down/:id',QuestionCtr.downVote)
route.delete('/:id',QuestionCtr.delete)





module.exports = route