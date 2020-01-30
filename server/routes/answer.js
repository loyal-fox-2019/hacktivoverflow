'use strict'

const router = require('express').Router()

const answerController = require('../controllers/answer')

const authentication = require('../middlewares/authentication')
const { ownAnswer } = require('../middlewares/authorization')

router.get('/:questionId', answerController.getAll)
router.use(authentication)
router.post('/:questionId', answerController.create)
router.post('/:answerId/votes', answerController.voteAnswer)
router.use('/answerId', ownAnswer)
router.patch('/:answerId', answerController.edit)


module.exports = router