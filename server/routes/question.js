const express = require('express');
const { QuestionController } = require('../controllers');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/', authentication, QuestionController.create);

router.get('/', QuestionController.readAll);

router.get('/:questionId', QuestionController.readOne);

router.put('/:questionId', authentication, QuestionController.update);

router.put(
  '/:questionId/upvote',
  authentication,
  QuestionController.userUpvote
);

router.put(
  '/:questionId/downvote',
  authentication,
  QuestionController.userDownvote
);

router.put(
  '/:questionId/unvote',
  authentication,
  QuestionController.userUnvote
);

router.delete('/:questionId', authentication, QuestionController.delete);

module.exports = router;
