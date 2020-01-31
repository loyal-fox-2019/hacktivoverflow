const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questtion-controller')
const verif = require('../midlleware/verif')

router.get('/', questionController.find)
router.get('/:id', questionController.findone)
router.use(verif.authentification)
router.delete('/:id', questionController.delete)
router.put('/:id', questionController.update)
router.post('/', questionController.create)
router.patch('/upvote/:id', questionController.upvote)
router.patch('/downvote/:id', questionController.downvote)

module.exports = router