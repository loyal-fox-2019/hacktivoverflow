'use strict'

const express = require('express')
const router = express.Router()
const question = require('../controllers/question')
const authorization = require('../middlewares/authorization')

router.post('/', question.createQuestion)
router.get('/', question.readAllQuestion)
router.get('/my', question.readMyQuestion)
router.get('/:id', question.readOneQuestion)
router.delete('/:id', authorization, question.deleteQuestion)
router.put('/:id', authorization, question.editQuestion)
router.patch('/upvotes/:id', question.upVotes)
router.patch('/downvotes/:id', question.downVotes)

module.exports = router