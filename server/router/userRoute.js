const routes = require("express").Router()
const controlUser = require('../controllers/controlUser.js')

routes.post("/register", controlUser.register)
routes.post("/login", controlUser.login)
routes.post("/google", controlUser.google)


module.exports = routes