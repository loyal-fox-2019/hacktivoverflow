const router = require('express').Router();
const Answer = require('../controllers/answerController');

router.get('/',Answer.findAll)
router.get('/:_id', Answer.getAllById)
router.post('/', Answer.create)
router.put('/:_id', Answer.edit)
router.delete('/', Answer.delete)

router.post('/upvote/:_id', Answer.upvote)
router.post('/downvote/:_id', Answer.downvote)

module.exports = router