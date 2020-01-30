const express = require('express');
const { UserController } = require('../controllers');
const authentication = require('../middlewares/authentication');

const router = express.Router();

// register
router.post('/register', UserController.register);

// signin
router.post('/signin', UserController.signIn);

// get current user profile
router.get('/profile', authentication, UserController.getCurrUserProfile);

// get other's user profile
router.get('/:userId', UserController.getOtherUserProfile);

module.exports = router;
