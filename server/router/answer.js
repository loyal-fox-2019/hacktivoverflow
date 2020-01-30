"use strict"

const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answer')
const auth = require('../middlewares/auth')

router.get('/:id', answerController.findAll)
router.use(auth.authenticate)

router.post('/:id', answerController.create)
router.patch('/:id/up', answerController.upVotes)
router.patch('/:id/down', answerController.downVotes)

router.use('/:id', auth.answerAuthorize)

router.patch('/:id', answerController.update)
router.delete('/:id', answerController.delete)


module.exports = router
