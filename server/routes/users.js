const express = require('express')
const route = express.Router()
const UserCtr = require('../controllers/user')

route.post('/login', UserCtr.login)
route.post('/register', UserCtr.register)

module.exports = route