const router = require('express').Router();
const controllerUser = require('../controller/user');
const checkToken = require('../middlewares/checkToken');

router.post('/register', controllerUser.register);
router.get('/confirmation?', controllerUser.confirmation);
router.patch('/activate/:id', controllerUser.activate);
router.post('/login', controllerUser.login);

//checking token
router.use(checkToken);
// get current user
router.get('/', controllerUser.currentUser);
router.get('/:id', controllerUser.viewUser);
router.patch('/watchTags', controllerUser.addWatchTags);

module.exports = router;