const express = require('express')
const router = express.Router()
const answer = require('../controllers/answer')

router.post('/:id', answer.createAnswer)
router.get('/', answer.read)
router.get('/:id', answer.readOne)
router.patch('/upvotes/:id', answer.upVotes)
router.patch('/downvotes/:id', answer.downVotes)

module.exports = router