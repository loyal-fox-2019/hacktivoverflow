'use strict'

const router = require('express').Router(),
      UserController = require('../controllers/userController'),
      QuestionController = require('../controllers/questionController')

router.post('/', UserController.watchTag) //done
router.get('/', QuestionController.findTags) //done
router.get('/filter/:keyword', QuestionController.filterTags) //done

module.exports = router;