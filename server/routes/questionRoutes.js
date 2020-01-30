const express = require('express')
const router = express.Router()
const { questionController } = require('../controllers')
const { authentication, questionAuthorization } = require('../middlewares/auth')

router.get('/', questionController.findAll)
router.get('/:questionId', questionController.findOne)
router.get('/:userId/myquestions', questionController.findMine)
router.use(authentication)
router.post('/', questionController.create)
router.patch('/:questionId/vote', questionController.vote)
router.patch('/:questionId', questionAuthorization ,questionController.update)
router.delete('/:questionId', questionAuthorization, questionController.destroy)

module.exports = router