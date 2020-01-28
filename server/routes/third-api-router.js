const router = require('express').Router()
const ThirdAPIController = require('../controllers/third-api-controller')

router.post('/google', ThirdAPIController.google)
router.post('/github', ThirdAPIController.github)
router.get('/request-twitter-token', ThirdAPIController.requestTwitterToken)
router.post('/twitter', ThirdAPIController.twitter)

module.exports = router
