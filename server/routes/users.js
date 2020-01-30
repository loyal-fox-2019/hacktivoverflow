const express = require('express')
const route = express.Router()
const UserCon = require('../controllers/UserCon')

route.post('/login', UserCon.login)
route.post('/register', UserCon.register)

module.exports = route