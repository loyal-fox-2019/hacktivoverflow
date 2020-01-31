'use strict'

const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

const authentication = (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization.split(' ')[1]
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
        userModel.findOne({
            email: tokenDecoded.email
        })
            .then(user => {
                if (!user) {
                    throw new Error()
                }
                else{
                    req.user = tokenDecoded
                    next()
                }
            })

    } catch (error) {
        const customError = new Error(`missing or invalid access token`)
        customError.status = 400
        next(customError)
    }
}

module.exports = authentication