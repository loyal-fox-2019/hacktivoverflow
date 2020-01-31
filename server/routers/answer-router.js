const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answer-controller')
const verif = require('../midlleware/verif')

router.get('/:id', answerController.find)
router.use(verif.authentification)
router.post('/',answerController.create)
router.put('/:id',answerController.update)
router.patch('/upvote/:id', answerController.upvote)
router.patch('/downvote/:id', answerController.downvote)



module.exports = router