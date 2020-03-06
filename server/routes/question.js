const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const questionController = require('../controllers/question');

router.get('/', questionController.getQuestion);
router.get('/:id', questionController.getQuestionById);
router.get('/:id/comments', questionController.getCommentsByQuestionId);

router.use('/', authentication)
router.post('/', questionController.addQuestion);
router.post('/:id/comments', questionController.addCommentToQuestionId);
router.patch('/:id/comments', questionController.updateCommentToQuestionId);

router.use('/:id', authorization)
router.patch('/:id', questionController.updateQuestionById);
router.delete('/:id', questionController.deleteQuestionById);

module.exports = router