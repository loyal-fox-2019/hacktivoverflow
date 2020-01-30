'use strict';

const router = require('express').Router();
const QuestionController = require('../controllers/QuestionController');
const { authentication, authorizationQue } = require('../middlewares/auth');

router.get('/', QuestionController.read);

router.use(authentication)
router.post('/', QuestionController.create);
router.get('/:id', QuestionController.readOne);

router.put('/:id', authorizationQue, QuestionController.update);
router.delete('/:id', authorizationQue, QuestionController.delete);

module.exports = router;