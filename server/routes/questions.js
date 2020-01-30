'use strict'

const router = require('express').Router(),
      QuestionController = require('../controllers/questionController'),
      { questionAuthorization } = require('../middlewares/auth')

router.post('/', QuestionController.create) //done
router.get('/', QuestionController.findAll) //done
router.get('/:id', QuestionController.findOne) //done
router.get('/filter/title/:keyword', QuestionController.filter) //done
router.get('/filter/tag/:keyword', QuestionController.filterQuestionByTag) //done
// http://localhost:3000/questions/5e30ee07b6863f0f52b15eaf?vote=down
router.patch('/:id', QuestionController.vote) //done

router.use('/:id', questionAuthorization)
router.put('/:id', QuestionController.update) //done
router.delete('/:id', QuestionController.destroy) //done

module.exports = router;