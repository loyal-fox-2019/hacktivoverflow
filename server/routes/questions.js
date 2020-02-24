const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authenticate, authorizeQuestion} = require('../middlewares/auth')

router.get('/', QuestionController.getAll)
router.get('/:id', QuestionController.getOne)

router.use(authenticate)
router.post('/', QuestionController.create)
router.patch('/:id', QuestionController.edit)
router.patch('/:id/vote', QuestionController.vote)
router.delete('/:id', authorizeQuestion, QuestionController.delete)

module.exports = router