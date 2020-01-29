const router = require('express').Router()
const QuestionController = require('../controller/QuestionController')

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.post('/pushupvotes', QuestionController.pushUpVotes)
router.post('/pullupvotes', QuestionController.pullUpVotes)


// admin tools
router.get('/test', QuestionController.test)
router.delete('/masterDelete', QuestionController.masterDelete)



router.get('/', QuestionController.findAllQuestion)
router.get('/:id', authentication, QuestionController.findQuestionById)


router.use(authentication)
router.post('/', QuestionController.createQuestion)
router.patch('/votes/:id', QuestionController.patchVotes)

router.get('/editFindOne/:id', authorization('Question'), QuestionController.findQuestionById)
router.put('/update/:id', authorization('Question'), QuestionController.putUpdate)
router.delete('/:id', authorization('Question'), QuestionController.deleteQuestion)





module.exports = router