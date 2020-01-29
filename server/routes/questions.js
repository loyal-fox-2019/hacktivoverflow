const express = require('express');
const router = express.Router();

const Authentication = require('../middlewares/Authentication')
const PreUpVote = require('../middlewares/PreUpVote')
const PreDownVote = require('../middlewares/PreDownVote')
const QuestionController = require('../controllers/QuestionController')
const AnswerController = require('../controllers/AnswerController')


router.get('/', QuestionController.getAll)
router.post('/', Authentication, QuestionController.create)
router.get('/:id', QuestionController.get)
router.put('/:id', Authentication, QuestionController.update)
router.patch('/upvote/:id', [Authentication, PreUpVote, QuestionController.upVote], QuestionController.get)
router.patch('/downvote/:id', [Authentication, PreDownVote, QuestionController.downVote], QuestionController.get)
router.patch('/views/:id', QuestionController.updateViews)


router.post('/:questionId/answers/',Authentication ,AnswerController.create)
router.get('/:questionId/answers/',Authentication, AnswerController.getAll)
router.get('/:questionId/answers/:id',Authentication, AnswerController.get)
router.put('/:questionId/answers/:id',[Authentication, AnswerController.update], AnswerController.get)
router.delete('/:questionId/answers/:id',Authentication, AnswerController.delete)

module.exports = router;
