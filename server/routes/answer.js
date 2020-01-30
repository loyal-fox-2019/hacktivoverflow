const router = require('express').Router()
const answerController = require('../controllers/answerController')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.post('/',answerController.create)
router.get('/',answerController.get)
router.get('/:id',answerController.getOne)
router.delete('/:id',answerController.delete)
router.put('/:id',answerController.update)
router.patch('/:id',answerController.vote)

module.exports = router