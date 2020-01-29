"use strict"

const router = require('express').Router()
const answersController = require('../controllers/Answers')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.post('/:idQuestion', answersController.create)
router.patch('/:id', answersController.update)
router.patch('/upVote/:id', answersController.upVote)
router.patch('/downVote/:id', answersController.downVote)

module.exports = router