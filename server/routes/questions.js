const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authenticate} = require('../middlewares/auth')

router.get('/', QuestionController.getAll)

router.use(authenticate)
router.post('/', QuestionController.create)
router.get('/:id', QuestionController.getOne)
router.patch('/:id/vote', QuestionController.vote)
router.delete('/:id', QuestionController.delete)

module.exports = router