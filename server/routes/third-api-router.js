const router = require('express').Router()
const ThirdAPIController = require('../controllers/third-api-controller')

router.post('/google', ThirdAPIController.google)

module.exports = router
