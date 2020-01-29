const router = require('express').Router()
const AnswerController = require('../controller/AnswerController')

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.get('/test', AnswerController.test)
router.delete('/master', AnswerController.MASTER_DELETE_ALL)

router.get('/', AnswerController.findAll)
router.get('/:questionid', AnswerController.findByQuestionId)


router.use(authentication)
router.get('/?', AnswerController.findAllAnswerByUser)
router.post('/', AnswerController.postAnswer)
router.patch('/votes/:id', AnswerController.patchVotes)

router.get('/editFindOne/:id', authorization('Answer'), AnswerController.findAnswerOne)
router.put('/update/:id', authorization('Answer'), AnswerController.putUpdate)
router.delete('/:id', authorization('Answer'), AnswerController.deleteAnswer)



module.exports = router