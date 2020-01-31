'use strict'

const router = require('express').Router(),
      UserController = require('../controllers/userController'),
      { authentication } = require('../middlewares/auth')

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post('/googleSignIn', UserController.googleSignIn)

router.use(authentication)
router.get('/profile', UserController.findOne)
router.put('/profile', UserController.edit)

module.exports = router;