const router = require('express').Router()
const QuestionController = require('../controllers/questionController')
const {authentication, questionAuthorization} = require('../middlewares/auth')

router.get('/', QuestionController.getAll)
router.get('/:id', QuestionController.getOne)
router.use(authentication)
router.patch('/remove_tag/:id', questionAuthorization, QuestionController.removeTagFromQuestion)
router.patch('/:id', questionAuthorization, QuestionController.updateOne)
router.patch('/:id/vote', authentication, QuestionController.vote)
router.post('/', QuestionController.create)
router.delete('/:id', questionAuthorization, QuestionController.delete)

module.exports = router