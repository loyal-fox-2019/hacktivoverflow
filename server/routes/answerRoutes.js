const express = require('express')
const router = express.Router()
const { answerController } = require('../controllers')
const { authentication, answerAuthorization } = require('../middlewares/auth')

router.get('/:questionId', answerController.findAll)
router.get('/answer/:answerId', answerController.findOne)

router.use(authentication)
router.post('/', answerController.create)
router.patch('/:answerId/vote', answerController.vote)
router.patch('/:answerId', answerAuthorization, answerController.update)
router.delete('/:answerId', answerAuthorization, answerController.destroy)

module.exports = router