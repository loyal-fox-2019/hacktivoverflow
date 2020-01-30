"use strict"

const express = require('express')
const router = express.Router()
const questionController = require('../controllers/question')
const auth = require('../middlewares/auth')

router.get('/', questionController.findAll)
router.get('/:id', questionController.findById)
router.use(auth.authenticate)

router.post('/', questionController.create)

router.patch('/:id/up', questionController.upVotes)
router.patch('/:id/down', questionController.downVotes)
router.use('/:id', auth.questionAuthorize)

router.patch('/:id', questionController.update)
router.delete('/:id', questionController.delete)



module.exports = router
