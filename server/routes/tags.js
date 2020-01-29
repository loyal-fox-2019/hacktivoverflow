'use strict'

const router = require('express').Router(),
      UserController = require('../controllers/userController'),
      QuestionController = require('../controllers/questionController')

router.post('/', UserController.watchTag)
router.get('/', QuestionController.findTags)
router.get('/:name', QuestionController.filterTag)

module.exports = router;