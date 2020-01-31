'use strict'

const router = require('express').Router(),
      AnswerController = require('../controllers/answerController'),
      { answerAuthorization } = require('../middlewares/auth')

router.post('/', AnswerController.create) //done
router.get('/:id', AnswerController.findOne)
router.patch('/:id', AnswerController.vote) //done

router.use('/:id', answerAuthorization)
router.put('/:id', AnswerController.update) //done
router.delete('/:id', AnswerController.destroy) //done

module.exports = router;