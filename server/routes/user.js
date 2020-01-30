const route = require('express').Router()
const controller = require('../controllers/userController')

route.post('/', controller.register)

route.post('/login', controller.login)

module.exports = route