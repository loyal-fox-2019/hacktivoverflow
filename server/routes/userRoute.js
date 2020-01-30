const router = require('express').Router();
const userCon = require('../controllers/userController');

router.post('/login', userCon.login)
router.post('/register', userCon.register)
router.post('/one', userCon.findOne)

module.exports = router
