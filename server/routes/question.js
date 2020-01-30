const questionController = require('../controllers/questionController')
const router = require('express').Router()
const { authentication } = require('../middlewares/auth')

router.get('/',questionController.get)
router.use(authentication)
router.get('/user',questionController.getUserQuestion)
router.post('/',questionController.create)
router.get('/:id',questionController.getOne)
router.put('/:id',questionController.update)
router.delete('/:id',questionController.delete)
router.patch('/:id',questionController.vote)

module.exports = router