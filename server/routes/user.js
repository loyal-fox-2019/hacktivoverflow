'use strict'

const router = require('express').Router()

const userController = require('../controllers/user')

const authentication = require('../middlewares/authentication')

router.post('/register', userController.create)
router.post('/login', userController.login)
router.use(authentication)
router.patch('/tags', userController.updateTags)

module.exports = router