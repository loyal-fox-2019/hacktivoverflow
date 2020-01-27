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

module.exports = router;