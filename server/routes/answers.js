'use strict'

const router = require('express').Router(),
      AnswerController = require('../controllers/answerController'),
      { answerAuthorization } = require('../middlewares/auth')

router.post('/', AnswerController.create)
router.get('/:id', AnswerController.findOne)
router.patch('/:id/vote', AnswerController.vote)

router.use('/:id', answerAuthorization)
router.put('/:id', AnswerController.update)
router.delete('/:id', AnswerController.destroy)

module.exports = router;