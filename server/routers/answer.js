const router = require('express').Router();
const controllerAnswer = require('../controller/answer');
const checkToken = require('../middlewares/checkToken');

//check token
router.use(checkToken);
//create answer
router.post('/create', controllerAnswer.create);
//view answer
router.get('/', controllerAnswer.view);
//delete answer
router.delete('/:id', controllerAnswer.delete);
//give like
router.patch('/:id/like/',controllerAnswer.like);
//give unlike
router.patch('/:id/unlike/',controllerAnswer.unLike);

module.exports = router;