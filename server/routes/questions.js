"use strict"

const router = require('express').Router()
const questionController = require('../controllers/Question')
const authentication = require('../middleware/authentication')

router.get('/', questionController.findAll)
router.get('/:id', questionController.findOne)
router.use(authentication)
router.post('/', questionController.create)
router.patch('/upVote/:id', questionController.upVote)
router.patch('/downVote/:id', questionController.downVote)
router.delete('/:id', questionController.delete)

module.exports = router