'use strict'

const questionController = require('../controllers/question')

const authentication = require('../middlewares/authentication')
const { ownQuestion } = require('../middlewares/authorization')

const router = require('express').Router()

router.get('/', questionController.getAll)
router.get('/:questionId', questionController.getOne)
router.use(authentication)
router.patch('/:questionId/votes', questionController.voteQuestion)
router.post('/', questionController.create)
router.use('/:questionId', ownQuestion)
router.patch('/:questionId', questionController.update)
router.delete('/:questionId', questionController.remove)

module.exports = router