'use strict'

const userModel = require('../models/user')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    static create(req, res, next) {
        const { name, email, password } = req.body
        const newUserData = {
            name,
            email,
            password
        }
        userModel.create(newUserData)
            .then(user => {
                const jwtPayload = {
                    userID: user.id,
                    email: user.email,
                }

                const token = jwt.sign(jwtPayload, process.env.JWT_SECRET)

                res.status(201).json({
                    message: 'success',
                    user: {
                        userID: user.id,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        access_token: token
                    }
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body

        userModel.findOne({
            email: email
        })
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    const customError = new Error()
                    customError.status = 400
                    customError.message = `invalid email & password combination!`

                    throw customError
                }
                else {
                    const jwtPayload = {
                        userID: user.id,
                        email: user.email,
                    }

                    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET)

                    res.status(200).json({
                        message: 'login success',
                        userID: user.id,
                        name: user.name,
                        email: user.email,
                        access_token: token
                    })
                }
            })
            .catch(next)
    }

    static getProfile(req, res, next) {
        const { userID } = req.user
        console.log(userID)
        userModel.findById(userID)
            .then(user => {
                res.status(200).json({
                    userID: user.id,
                    name: user.name,
                    email: user.email,
                })
            })
            .catch(next)
    }

    static updateTags(req, res, next) {

    }
}

module.exports = UserController