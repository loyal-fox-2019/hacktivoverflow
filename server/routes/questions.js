'use strict'

const router = require('express').Router(),
      QuestionController = require('../controllers/questionController'),
      { questionAuthorization } = require('../middlewares/auth')

router.post('/', QuestionController.create)
router.get('/', QuestionController.findAll)
// +populating answers
router.get('/:id', QuestionController.findOne)
router.get('/filter/:val', QuestionController.filter)
// http://localhost:3000/questions/5e30ee07b6863f0f52b15eaf?vote=down
router.patch('/:id/vote', QuestionController.vote)

router.use('/:id', questionAuthorization)
router.put('/:id', QuestionController.update)
router.delete('/:id', QuestionController.destroy)

module.exports = router;