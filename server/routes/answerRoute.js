const router = require('express').Router();
const Answer = require('../controllers/answerController');

router.get('/',Answer.findAll)
router.get('/:_id', Answer.getAllById)
router.post('/', Answer.create)
router.put('/', Answer.edit)
router.delete('/', Answer.delete)

module.exports = router