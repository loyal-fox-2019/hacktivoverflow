const express = require('express')
const route = express.Router()
const TagCon = require('../controllers/TagsCon')
const { authenticate } = require('../middlewares/auth')

route.use(authenticate)
route.post('/', TagCon.add)
route.post('/search', TagCon.searchTag)
module.exports = route
