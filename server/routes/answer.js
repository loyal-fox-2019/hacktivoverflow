const express = require('express');
const { AnswerController } = require('../controllers');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/', authentication, AnswerController.create);

router.get('/', AnswerController.readAll);

router.get('/:answerId', AnswerController.readOne);

router.put('/:answerId', authentication, AnswerController.update);

router.put('/:answerId/upvote', authentication, AnswerController.userUpvote);

router.put(
  '/:answerId/downvote',
  authentication,
  AnswerController.userDownvote
);

router.put('/:answerId/unvote', authentication, AnswerController.userUnvote);

router.delete('/:answerId', authentication, AnswerController.delete);

module.exports = router;
