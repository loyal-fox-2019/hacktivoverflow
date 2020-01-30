const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const upload = require('../middlewares/gcs-upluad')

router.post('/', authenticate, upload.single('picture'), QuestionController.create)
router.get('/', authenticate, QuestionController.findAll)
router.get('/user', authenticate, QuestionController.findAllUser)
router.get('/:questionId', authenticate, QuestionController.findOne)
router.put('/:questionId', authenticate, authorization, QuestionController.update)
router.delete('/:questionId', authenticate, authorization, QuestionController.delete)
router.patch('/upvote/:questionId', authenticate, QuestionController.upvote)
router.patch('/downvote/:questionId', authenticate, QuestionController.downvote)

module.exports = router