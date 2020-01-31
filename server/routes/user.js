'use strict'

const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const authentication = require('../middlewares/authentication')

router.post('/login', user.login)
router.post('/register', user.register)
router.use(authentication)
router.get('/tags', user.fetchTags)
router.patch('/tags', user.editTags)

module.exports = router